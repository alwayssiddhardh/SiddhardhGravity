import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, Torus, Icosahedron } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural "Earth-like" rotating planet — continents (green/brown) over deep blue oceans,
 * subtle clouds layer, atmosphere glow and orbiting rings.
 */
function EarthPlanet() {
  const planet = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.Mesh>(null);

  const earthTexture = useMemo(() => makeEarthTexture(), []);
  const cloudTexture = useMemo(() => makeCloudTexture(), []);

  useFrame((_, dt) => {
    if (planet.current) planet.current.rotation.y += dt * 0.18;
    if (clouds.current) clouds.current.rotation.y += dt * 0.05;
    if (atmosphere.current) atmosphere.current.rotation.y -= dt * 0.02;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={1.2}>
      <group>
        {/* Planet */}
        <Sphere ref={planet} args={[1.5, 128, 128]}>
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.85}
            metalness={0.05}
            emissive={"#0a1a3a"}
            emissiveIntensity={0.18}
          />
        </Sphere>

        {/* Clouds */}
        <Sphere ref={clouds} args={[1.53, 96, 96]}>
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </Sphere>

        {/* Atmosphere glow shell */}
        <Sphere ref={atmosphere} args={[1.62, 64, 64]}>
          <meshBasicMaterial
            color={"#3aa0ff"}
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Tiny moon */}
        <Icosahedron args={[0.18, 1]} position={[2.6, 0.5, 0.2]}>
          <meshStandardMaterial color="#cfd6e0" roughness={0.9} />
        </Icosahedron>
      </group>
    </Float>
  );
}

function OrbitRing({ radius, color, tilt }: { radius: number; color: string; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.22 * (radius % 2 === 0 ? 1 : -1);
  });
  return (
    <Torus ref={ref} args={[radius, 0.01, 16, 220]} rotation={[tilt, 0, 0]}>
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
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 3, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.45} color="#3aa0ff" />
        <pointLight position={[0, 2, 3]} intensity={0.6} color="#7ccd75" />

        <EarthPlanet />
        <OrbitRing radius={2.3} color="#ff5fa2" tilt={1.1} />
        <OrbitRing radius={2.7} color="#007bff" tilt={0.6} />
        <OrbitRing radius={3.1} color="#7ccd75" tilt={-0.4} />

        <Stars radius={28} depth={40} count={1800} factor={2.2} saturation={0.6} fade speed={1} />
      </Suspense>
    </Canvas>
  );
}

/* ---------- Procedural textures (no external assets) ---------- */

function makeEarthTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Ocean gradient base
  const og = ctx.createLinearGradient(0, 0, 0, h);
  og.addColorStop(0, "#0b2447");
  og.addColorStop(0.5, "#0e3a73");
  og.addColorStop(1, "#0b2447");
  ctx.fillStyle = og;
  ctx.fillRect(0, 0, w, h);

  // Random continent blobs (greens / browns)
  const landColors = ["#1e7a3a", "#256b2b", "#3a7a2c", "#5a8a3e", "#7a6b2f", "#3a5a25"];
  for (let i = 0; i < 110; i++) {
    const cx = Math.random() * w;
    const cy = h * 0.15 + Math.random() * h * 0.7;
    const rx = 30 + Math.random() * 140;
    const ry = 20 + Math.random() * 80;
    const color = landColors[Math.floor(Math.random() * landColors.length)];
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    g.addColorStop(0, color);
    g.addColorStop(0.7, color + "cc");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Polar ice caps
  const top = ctx.createLinearGradient(0, 0, 0, h * 0.12);
  top.addColorStop(0, "rgba(255,255,255,0.95)");
  top.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, w, h * 0.12);
  const bot = ctx.createLinearGradient(0, h * 0.88, 0, h);
  bot.addColorStop(0, "rgba(255,255,255,0)");
  bot.addColorStop(1, "rgba(255,255,255,0.95)");
  ctx.fillStyle = bot;
  ctx.fillRect(0, h * 0.88, w, h * 0.12);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function makeCloudTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 220; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = 15 + Math.random() * 70;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, "rgba(255,255,255,0.8)");
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
