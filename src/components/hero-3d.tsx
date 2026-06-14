import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, Torus, Icosahedron, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Vivid blue-purple "earth-like" planet inspired by reference: cratered/dappled
 * surface, glowing atmosphere, cursor-draggable. Stars rotate slowly and pulse.
 */
function EarthPlanet() {
  const planet = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.Mesh>(null);

  const surfaceTex = useMemo(() => makeSurfaceTexture(), []);
  const cloudTex = useMemo(() => makeSpeckleTexture(), []);

  useFrame((_, dt) => {
    if (planet.current) planet.current.rotation.y += dt * 0.15;
    if (clouds.current) clouds.current.rotation.y += dt * 0.06;
    if (atmosphere.current) atmosphere.current.rotation.y -= dt * 0.03;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={1.3}>
      <group>
        <Sphere ref={planet} args={[1.55, 128, 128]}>
          <meshStandardMaterial
            map={surfaceTex}
            roughness={0.7}
            metalness={0.15}
            emissive={"#1a1066"}
            emissiveIntensity={0.35}
          />
        </Sphere>

        <Sphere ref={clouds} args={[1.58, 96, 96]}>
          <meshStandardMaterial
            map={cloudTex}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </Sphere>

        {/* Inner atmosphere */}
        <Sphere args={[1.66, 64, 64]}>
          <meshBasicMaterial color={"#5a8cff"} transparent opacity={0.18} side={THREE.BackSide} />
        </Sphere>
        {/* Outer halo */}
        <Sphere ref={atmosphere} args={[1.82, 64, 64]}>
          <meshBasicMaterial color={"#7d5cff"} transparent opacity={0.10} side={THREE.BackSide} />
        </Sphere>

        <Icosahedron args={[0.16, 1]} position={[2.7, 0.6, 0.2]}>
          <meshStandardMaterial color="#d8d6e5" roughness={0.85} />
        </Icosahedron>
      </group>
    </Float>
  );
}

function OrbitRing({ radius, color, tilt, speed }: { radius: number; color: string; tilt: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.012, 16, 220]} rotation={[tilt, 0, 0]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
    </Torus>
  );
}

function MovingStars() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.1) * 0.05;
  });
  return (
    <group ref={ref}>
      <Stars radius={30} depth={45} count={2400} factor={3.2} saturation={0.8} fade speed={2.2} />
    </group>
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 3, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#7d5cff" />
        <pointLight position={[0, 2, 3]} intensity={0.7} color="#ff5fa2" />

        <EarthPlanet />
        <OrbitRing radius={2.3} color="#ff5fa2" tilt={1.1} speed={0.25} />
        <OrbitRing radius={2.7} color="#3aa0ff" tilt={0.6} speed={-0.18} />
        <OrbitRing radius={3.1} color="#7ccd75" tilt={-0.4} speed={0.14} />

        <MovingStars />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          rotateSpeed={0.7}
        />
      </Suspense>
    </Canvas>
  );
}

/* ---------- Procedural textures (no external assets) ---------- */

function makeSurfaceTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Deep blue → violet base
  const og = ctx.createLinearGradient(0, 0, 0, h);
  og.addColorStop(0, "#1a1466");
  og.addColorStop(0.35, "#2a2cb8");
  og.addColorStop(0.65, "#3324c9");
  og.addColorStop(1, "#1a1466");
  ctx.fillStyle = og;
  ctx.fillRect(0, 0, w, h);

  // Crater / spot dapples — varied blues and purples, like reference
  const dotColors = ["#0e0a4f", "#1a1488", "#3a2db8", "#5a3cc4", "#7d5cff", "#241980"];
  for (let i = 0; i < 360; i++) {
    const cx = Math.random() * w;
    const cy = h * 0.05 + Math.random() * h * 0.9;
    const r = 4 + Math.random() * 38;
    const color = dotColors[Math.floor(Math.random() * dotColors.length)];
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, color);
    g.addColorStop(0.6, color + "aa");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bright highlight specks
  for (let i = 0; i < 90; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = 1 + Math.random() * 3;
    ctx.fillStyle = "rgba(200,180,255,0.7)";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function makeSpeckleTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 180; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = 8 + Math.random() * 50;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, "rgba(180,160,255,0.5)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}
