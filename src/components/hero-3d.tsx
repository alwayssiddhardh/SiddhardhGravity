import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere, Stars, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function MorphingOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.6}>
      <Sphere ref={ref} args={[1.4, 96, 96]}>
        <MeshDistortMaterial
          color="#6f42c1"
          emissive="#ff5fa2"
          emissiveIntensity={0.35}
          distort={0.55}
          speed={2.1}
          roughness={0.15}
          metalness={0.55}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing({ radius, color, tilt }: { radius: number; color: string; tilt: number }) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.2 * (radius % 2 === 0 ? 1 : -1);
  });
  return (
    <Torus ref={ref} args={[radius, 0.012, 16, 200]} rotation={[tilt, 0, 0]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} toneMapped={false} />
    </Torus>
  );
}

export function Hero3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.4} color="#ff5fa2" />
        <directionalLight position={[-3, -2, -2]} intensity={1.2} color="#007bff" />
        <pointLight position={[0, 2, 3]} intensity={1.1} color="#7ccd75" />

        <MorphingOrb />
        <OrbitRing radius={2.1} color="#ff5fa2" tilt={1.1} />
        <OrbitRing radius={2.5} color="#007bff" tilt={0.6} />
        <OrbitRing radius={2.9} color="#7ccd75" tilt={-0.4} />

        <Stars radius={20} depth={30} count={1200} factor={2} saturation={0.8} fade speed={1} />
      </Suspense>
    </Canvas>
  );
}
