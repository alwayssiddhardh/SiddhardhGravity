import { useEffect, useRef } from "react";

/**
 * Cursor-radius particle field.
 * Dense, multi-colored speck cloud that lives only inside a halo around the cursor.
 * Particles drift like bubbles in a viscous liquid — slight buoyancy, gentle swirl,
 * pulled back when they cross the halo boundary, fade in/out on enter/leave.
 */
type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
  target: number;
  phase: number;
  freq: number;
};

const COLORS = [
  "#ff5fa2", "#ff7ab8", "#6f42c1", "#8a5cf6",
  "#007bff", "#3aa0ff", "#7ccd75", "#ffd166", "#ff8a3d",
];
const RADIUS = 190;
const COUNT = 220;

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
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.4,
        hue: Math.floor(Math.random() * COLORS.length),
        life: 0,
        target: 0,
        phase: Math.random() * Math.PI * 2,
        freq: 0.6 + Math.random() * 1.4,
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
    let startTime = performance.now();

    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = (t - startTime) / 1000;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      if (mouse.current.active) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        grad.addColorStop(0, "rgba(255,95,162,0.08)");
        grad.addColorStop(0.5, "rgba(111,66,193,0.04)");
        grad.addColorStop(1, "rgba(0,123,255,0.0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // Continuous respawn — keeps cloud dense like in reference
      if (t - lastSpawn > 22 && mouse.current.active) {
        lastSpawn = t;
        for (let s = 0; s < 4; s++) {
          const dead = particles.current.find((p) => p.life < 0.04 && p.target === 1);
          if (!dead) break;
          const a = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random()) * RADIUS * 0.95;
          dead.x = mx + Math.cos(a) * r;
          dead.y = my + Math.sin(a) * r;
          dead.vx = (Math.random() - 0.5) * 0.8;
          dead.vy = (Math.random() - 0.5) * 0.6 - 0.25;
          dead.r = Math.random() * 1.8 + 0.4;
          dead.hue = Math.floor(Math.random() * COLORS.length);
          dead.life = 0;
          dead.phase = Math.random() * Math.PI * 2;
        }
      }

      ctx.globalCompositeOperation = "lighter";

      particles.current.forEach((p) => {
        const easeIn = 0.04;
        const easeOut = 0.022;
        p.life += (p.target - p.life) * (p.target > p.life ? easeIn : easeOut);
        if (p.life < 0.01) return;

        // Liquid bubble motion — sinusoidal wobble + buoyancy
        const wob = Math.sin(time * p.freq + p.phase) * 0.05;
        p.vx += wob;
        p.vy -= 0.012; // buoyant rise

        p.x += p.vx;
        p.y += p.vy;

        if (mouse.current.active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d = Math.hypot(dx, dy);
          if (d > RADIUS * 0.9) {
            const pull = (d - RADIUS * 0.9) * 0.004;
            p.vx += (dx / d) * pull;
            p.vy += (dy / d) * pull;
          } else {
            // gentle orbital swirl
            p.vx += (-dy / (d + 1)) * 0.006;
            p.vy += (dx / (d + 1)) * 0.006;
          }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        const color = COLORS[p.hue];
        ctx.globalAlpha = p.life * 0.9;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.6 + p.life * 0.6), 0, Math.PI * 2);
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
