import { useEffect, useRef } from "react";

/**
 * Cursor-radius particle field — "floating in space" feel inspired by
 * antigravity.google. Larger speckles, gentle drift in random directions
 * (no buoyancy), with a synchronized hue that cycles across the whole
 * cloud in unison — every particle shares the same color at the same time.
 */
type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  target: number;
  phase: number;
  freq: number;
};

const RADIUS = 210;
const COUNT = 180;

// Rainbow keystops the global hue cycles through (same color for all particles at once)
const HUE_STOPS = [
  { h: 330, s: 95, l: 65 }, // hot pink
  { h: 270, s: 85, l: 65 }, // violet
  { h: 215, s: 95, l: 60 }, // azure
  { h: 175, s: 80, l: 55 }, // teal
  { h: 110, s: 70, l: 55 }, // green
  { h: 45,  s: 95, l: 60 }, // amber
  { h: 15,  s: 90, l: 60 }, // orange-red
];
const CYCLE_SECONDS = 8; // full color rotation

function sampleHue(t: number) {
  const total = HUE_STOPS.length;
  const pos = ((t / CYCLE_SECONDS) % 1) * total;
  const i = Math.floor(pos);
  const f = pos - i;
  const a = HUE_STOPS[i % total];
  const b = HUE_STOPS[(i + 1) % total];
  // shortest-path hue lerp
  let dh = b.h - a.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = (a.h + dh * f + 360) % 360;
  const s = a.s + (b.s - a.s) * f;
  const l = a.l + (b.l - a.l) * f;
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
}

export function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const particles = useRef<P[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.current.push({
        x: 0, y: 0,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.6 + 1.4,    // bigger
        life: 0,
        target: 0,
        phase: Math.random() * Math.PI * 2,
        freq: 0.4 + Math.random() * 1.0,
      });
    }

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
      particles.current.forEach((p) => (p.target = 1));
    };
    const onLeave = () => {
      mouse.current.active = false;
      particles.current.forEach((p) => (p.target = 0));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);

    let lastSpawn = 0;
    const startTime = performance.now();

    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = (t - startTime) / 1000;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // current global color — same for every particle (synced like titles)
      const color = sampleHue(time);

      if (mouse.current.active) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        grad.addColorStop(0, "rgba(255,255,255,0.06)");
        grad.addColorStop(0.55, "rgba(255,255,255,0.025)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      if (t - lastSpawn > 28 && mouse.current.active) {
        lastSpawn = t;
        for (let s = 0; s < 4; s++) {
          const dead = particles.current.find((p) => p.life < 0.04 && p.target === 1);
          if (!dead) break;
          const a = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random()) * RADIUS * 0.95;
          dead.x = mx + Math.cos(a) * r;
          dead.y = my + Math.sin(a) * r;
          // random drift in any direction — floating in space, no gravity
          const dir = Math.random() * Math.PI * 2;
          const speed = 0.15 + Math.random() * 0.5;
          dead.vx = Math.cos(dir) * speed;
          dead.vy = Math.sin(dir) * speed;
          dead.r = Math.random() * 2.8 + 1.4;
          dead.life = 0;
          dead.phase = Math.random() * Math.PI * 2;
          dead.freq = 0.4 + Math.random() * 1.0;
        }
      }

      ctx.globalCompositeOperation = "lighter";

      particles.current.forEach((p) => {
        const easeIn = 0.05;
        const easeOut = 0.018;
        p.life += (p.target - p.life) * (p.target > p.life ? easeIn : easeOut);
        if (p.life < 0.01) return;

        // weightless space drift — sinusoidal wobble in both axes, no buoyancy
        p.vx += Math.sin(time * p.freq + p.phase) * 0.012;
        p.vy += Math.cos(time * (p.freq * 0.9) + p.phase * 1.3) * 0.012;

        p.x += p.vx;
        p.y += p.vy;

        if (mouse.current.active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d = Math.hypot(dx, dy);
          if (d > RADIUS * 0.9) {
            const pull = (d - RADIUS * 0.9) * 0.003;
            p.vx += (dx / d) * pull;
            p.vy += (dy / d) * pull;
          } else {
            // very gentle orbital swirl
            p.vx += (-dy / (d + 1)) * 0.003;
            p.vy += (dx / (d + 1)) * 0.003;
          }
        }

        // low friction so they drift longer (space)
        p.vx *= 0.985;
        p.vy *= 0.985;

        ctx.globalAlpha = p.life * 0.95;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.7 + p.life * 0.7), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}
