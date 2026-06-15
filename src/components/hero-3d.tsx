import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, Torus, Ring, Icosahedron, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   Hero 3D — a mini solar system
   - Center planet (vivid blue-purple, earth-like)
   - Saturn-style ringed companion
   - Several orbiting worldlets on inclined orbits
   - Multi-layer deep starfield background
   ============================================================ */

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
          <meshStandardMaterial map={cloudTex} transparent opacity={0.5} depthWrite={false} />
        </Sphere>

        <Sphere args={[1.66, 64, 64]}>
          <meshBasicMaterial color={"#5a8cff"} transparent opacity={0.18} side={THREE.BackSide} />
        </Sphere>
        <Sphere ref={atmosphere} args={[1.82, 64, 64]}>
          <meshBasicMaterial color={"#7d5cff"} transparent opacity={0.1} side={THREE.BackSide} />
        </Sphere>
      </group>
    </Float>
  );
}

/* Saturn-like ringed companion, orbits around the center planet */
function Saturn({ orbitRadius = 4.2, orbitSpeed = 0.18, orbitTilt = 0.35 }) {
  const pivot = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  useFrame((s, dt) => {
    if (pivot.current) pivot.current.rotation.y = s.clock.elapsedTime * orbitSpeed;
    if (body.current) body.current.rotation.y += dt * 0.4;
  });
  const tex = useMemo(() => makeBandedTexture(["#f7c873", "#e89a3c", "#c47a25", "#f3d49a"]), []);
  return (
    <group ref={pivot} rotation={[orbitTilt, 0, 0]}>
      <group position={[orbitRadius, 0, 0]}>
        <Sphere ref={body} args={[0.45, 64, 64]}>
          <meshStandardMaterial map={tex} roughness={0.6} metalness={0.1} emissive="#3a1f05" emissiveIntensity={0.2} />
        </Sphere>
        {/* Saturn rings */}
        <group rotation={[Math.PI / 2.3, 0, 0]}>
          <Ring args={[0.62, 0.78, 96]}>
            <meshBasicMaterial color="#f0c98a" side={THREE.DoubleSide} transparent opacity={0.85} />
          </Ring>
          <Ring args={[0.82, 0.95, 96]}>
            <meshBasicMaterial color="#c08a4a" side={THREE.DoubleSide} transparent opacity={0.6} />
          </Ring>
          <Ring args={[1.0, 1.12, 96]}>
            <meshBasicMaterial color="#e7b884" side={THREE.DoubleSide} transparent opacity={0.45} />
          </Ring>
        </group>
      </group>
    </group>
  );
}

/* Generic orbiting worldlet */
function Worldlet({
  radius, speed, tilt, size, color, emissive, phase = 0,
}: { radius: number; speed: number; tilt: number; size: number; color: string; emissive: string; phase?: number }) {
  const pivot = useRef<THREE.Group>(null);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s, dt) => {
    if (pivot.current) pivot.current.rotation.y = s.clock.elapsedTime * speed + phase;
    if (ref.current) ref.current.rotation.y += dt * 0.6;
  });
  return (
    <group ref={pivot} rotation={[tilt, 0, 0]}>
      <group position={[radius, 0, 0]}>
        <Sphere ref={ref} args={[size, 48, 48]}>
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.6} roughness={0.5} />
        </Sphere>
      </group>
    </group>
  );
}

function OrbitRing({ radius, color, tilt, speed }: { radius: number; color: string; tilt: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.008, 16, 220]} rotation={[tilt, 0, 0]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} transparent opacity={0.7} />
    </Torus>
  );
}

function DeepStars() {
  const ref = useRef<THREE.Group>(null);
  const ref2 = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015;
    if (ref2.current) ref2.current.rotation.y -= dt * 0.008;
    if (ref.current) ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.08) * 0.04;
  });
  return (
    <>
      <group ref={ref}>
        <Stars radius={40} depth={60} count={4200} factor={3.6} saturation={0.9} fade speed={2.4} />
      </group>
      <group ref={ref2}>
        <Stars radius={80} depth={20} count={1800} factor={6} saturation={0} fade speed={0.6} />
      </group>
    </>
  );
}

export function Hero3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 6], fov: 48 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 3, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.55} color="#7d5cff" />
        <pointLight position={[0, 2, 3]} intensity={0.7} color="#ff5fa2" />

        <EarthPlanet />

        {/* Orbit rails */}
        <OrbitRing radius={2.3} color="#ff5fa2" tilt={1.1} speed={0.25} />
        <OrbitRing radius={2.7} color="#3aa0ff" tilt={0.6} speed={-0.18} />
        <OrbitRing radius={3.4} color="#7ccd75" tilt={-0.4} speed={0.14} />
        <OrbitRing radius={4.2} color="#f7c873" tilt={0.35} speed={-0.1} />
        <OrbitRing radius={5.0} color="#a78bfa" tilt={-0.2} speed={0.08} />

        {/* Solar system bodies */}
        <Worldlet radius={2.3} speed={0.45} tilt={1.1} size={0.12} color="#ff8fb8" emissive="#ff3a82" />
        <Worldlet radius={2.7} speed={-0.35} tilt={0.6} size={0.16} color="#7ccfff" emissive="#1a78d4" phase={1.5} />
        <Worldlet radius={3.4} speed={0.28} tilt={-0.4} size={0.14} color="#9eea9b" emissive="#2f8a32" phase={2.8} />
        <Saturn orbitRadius={4.2} orbitSpeed={0.18} orbitTilt={0.35} />
        <Worldlet radius={5.0} speed={0.12} tilt={-0.2} size={0.22} color="#d8d6e5" emissive="#3a2db8" phase={4.1} />

        {/* Far asteroid */}
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.6}>
          <Icosahedron args={[0.18, 1]} position={[3.0, 1.4, -0.4]}>
            <meshStandardMaterial color="#d8d6e5" roughness={0.85} />
          </Icosahedron>
        </Float>

        <DeepStars />

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
  const w = 1024, h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const og = ctx.createLinearGradient(0, 0, 0, h);
  og.addColorStop(0, "#1a1466");
  og.addColorStop(0.35, "#2a2cb8");
  og.addColorStop(0.65, "#3324c9");
  og.addColorStop(1, "#1a1466");
  ctx.fillStyle = og;
  ctx.fillRect(0, 0, w, h);
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
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = "rgba(200,180,255,0.7)";
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, 1 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function makeSpeckleTexture() {
  const w = 1024, h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 180; i++) {
    const cx = Math.random() * w, cy = Math.random() * h, r = 8 + Math.random() * 50;
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

function makeBandedTexture(bands: string[]) {
  const w = 512, h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  bands.forEach((c, i) => g.addColorStop(i / (bands.length - 1), c));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // subtle horizontal streaks
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.05})`;
    const y = Math.random() * h;
    ctx.fillRect(0, y, w, 1 + Math.random() * 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}
