import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/* Wireframe Earth (lat/long grid only) — no fill, transparent. */
function WireEarth() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={ref}>
      {/* Main sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1.5, 24, 18]} />
        <meshBasicMaterial color="currentColor" wireframe transparent opacity={0.55} />
      </mesh>
      {/* Equator highlight */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.008, 8, 96]} />
        <meshBasicMaterial color="currentColor" />
      </mesh>
      {/* Prime meridian */}
      <mesh>
        <torusGeometry args={[1.5, 0.008, 8, 96]} />
        <meshBasicMaterial color="currentColor" />
      </mesh>
    </group>
  );
}

/* Tiny chibi astronaut sitting on top of the globe */
function Astronaut() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 1.2) * 0.05;
    ref.current.position.y = 1.95 + Math.sin(s.clock.elapsedTime * 1.6) * 0.03;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={[0, 1.95, 0]} scale={0.55}>
        {/* Body */}
        <mesh position={[0, -0.05, 0]}>
          <capsuleGeometry args={[0.32, 0.25, 8, 16]} />
          <meshStandardMaterial color="#f3f3f7" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Chest panel */}
        <mesh position={[0, -0.05, 0.3]}>
          <boxGeometry args={[0.22, 0.16, 0.04]} />
          <meshStandardMaterial color="#7d5cff" emissive="#7d5cff" emissiveIntensity={0.6} />
        </mesh>
        {/* Helmet */}
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshPhysicalMaterial
            color="#a9c8ff"
            transmission={0.85}
            roughness={0.05}
            thickness={0.4}
            clearcoat={1}
            ior={1.4}
          />
        </mesh>
        {/* Visor reflection */}
        <mesh position={[0.08, 0.46, 0.22]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Backpack */}
        <mesh position={[0, -0.05, -0.32]}>
          <boxGeometry args={[0.42, 0.4, 0.18]} />
          <meshStandardMaterial color="#e4e4ec" roughness={0.7} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.85, -0.05]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
          <meshStandardMaterial color="#cfcfd9" />
        </mesh>
        <mesh position={[0, 0.98, -0.05]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ff5fa2" emissive="#ff5fa2" emissiveIntensity={1.2} />
        </mesh>
        {/* Legs (sitting, dangling forward) */}
        <mesh position={[-0.16, -0.42, 0.18]} rotation={[0.6, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.28, 6, 12]} />
          <meshStandardMaterial color="#ededf3" />
        </mesh>
        <mesh position={[0.16, -0.42, 0.18]} rotation={[0.6, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.28, 6, 12]} />
          <meshStandardMaterial color="#ededf3" />
        </mesh>
        {/* Arms (resting on knees) */}
        <mesh position={[-0.34, -0.05, 0.12]} rotation={[0.7, 0, 0.4]}>
          <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
          <meshStandardMaterial color="#ededf3" />
        </mesh>
        <mesh position={[0.34, -0.05, 0.12]} rotation={[0.7, 0, -0.4]}>
          <capsuleGeometry args={[0.09, 0.3, 6, 12]} />
          <meshStandardMaterial color="#ededf3" />
        </mesh>
      </group>
    </Float>
  );
}

export function Astronaut404({ className }: { className?: string }) {
  return (
    <div className={className} style={{ color: "currentColor" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#7d5cff" />
          <WireEarth />
          <Astronaut />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
