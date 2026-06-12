import { useEffect, useRef } from "react";

/**
 * Cursor-radius particle field.
 * - Particles only appear inside a circular halo around the cursor.
 * - No edges connecting particles (individual points only, per spec).
 * - Opening: particles fade-in / scale-in. Closing: same fade-out when cursor leaves.
 * - Rainbow palette: pink / violet / blue / green.
 */
type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number; // 0..1, for opening/closing animation
  target: number; // life target (1 active, 0 closing)
};

const COLORS = ["#ff5fa2", "#6f42c1", "#007bff", "#7ccd75"];
const RADIUS = 170;
const COUNT = 60;

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

    // Pre-seed particles inside the halo (will follow cursor)
    for (let i = 0; i < COUNT; i++) {
      particles.current.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2.6 + 0.6,
        hue: i % COLORS.length,
        life: 0,
        target: 0,
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

    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Soft halo glow under particles (subtle, additive)
      if (mouse.current.active) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        grad.addColorStop(0, "rgba(255,95,162,0.10)");
        grad.addColorStop(0.5, "rgba(111,66,193,0.06)");
        grad.addColorStop(1, "rgba(0,123,255,0.0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // Periodically respawn drifting particles to keep field lively
      if (t - lastSpawn > 90 && mouse.current.active) {
        lastSpawn = t;
        const dead = particles.current.find((p) => p.life < 0.05 && p.target === 1);
        if (dead) {
          const a = Math.random() * Math.PI * 2;
          const r = Math.random() * RADIUS * 0.85;
          dead.x = mx + Math.cos(a) * r;
          dead.y = my + Math.sin(a) * r;
          dead.vx = (Math.random() - 0.5) * 1.2;
          dead.vy = (Math.random() - 0.5) * 1.2 - 0.3; // slight upward "bubble" drift
          dead.r = Math.random() * 2.8 + 0.8;
          dead.hue = Math.floor(Math.random() * COLORS.length);
          dead.life = 0;
        }
      }

      particles.current.forEach((p) => {
        // Easing — opening (slower fade-in) and closing (slower fade-out) per user spec
        const easeIn = 0.025;
        const easeOut = 0.018;
        p.life += (p.target - p.life) * (p.target > p.life ? easeIn : easeOut);

        if (p.life < 0.01) return;

        // Gentle bubble-rise + drift, pulled toward cursor a bit
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005; // upward buoyancy

        if (mouse.current.active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d = Math.hypot(dx, dy);
          if (d > RADIUS) {
            // Pull back inside halo
            p.vx += (dx / d) * 0.05;
            p.vy += (dy / d) * 0.05;
          } else {
            // Slight orbital swirl
            p.vx += (-dy / (d + 1)) * 0.005;
            p.vy += (dx / (d + 1)) * 0.005;
          }
        }

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        const color = COLORS[p.hue];
        const alpha = p.life;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * 0.95;
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      });

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
