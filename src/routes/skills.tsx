import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { skills } from "@/lib/portfolio-data";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleText } from "@/components/scramble-text";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Siddhardha Ungarala" },
      { name: "description", content: "Languages, frameworks, AI libraries and tools used by Siddhardha." },
      { property: "og:title", content: "Skills — Siddhardha Ungarala" },
      { property: "og:description", content: "The full stack: languages, AI, frameworks, cloud and tools." },
    ],
  }),
  component: SkillsPage,
});

const COLORS = ["#ff5fa2", "#6f42c1", "#007bff", "#7ccd75"];

/**
 * GSAP free re-implementation of the Physics2DPlugin pattern:
 *   gsap.to(el, { duration, physics2D: { velocity, angle, gravity }})
 *
 * We animate x/y/rotation/opacity manually under gravity, mirroring the
 * plugin's parametric motion in pure GSAP (no Club plugin required).
 */
function physics2DBurst(origin: { x: number; y: number }, container: HTMLElement) {
  const COUNT = 36;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement("span");
    const size = 6 + Math.random() * 10;
    const color = COLORS[i % COLORS.length];
    Object.assign(dot.style, {
      position: "absolute",
      left: origin.x + "px",
      top: origin.y + "px",
      width: size + "px",
      height: size + "px",
      borderRadius: "999px",
      background: color,
      boxShadow: `0 0 12px ${color}`,
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
      willChange: "transform, opacity",
    } as CSSStyleDeclaration);
    container.appendChild(dot);

    const velocity = 280 + Math.random() * 320;
    const angle = (-60 + (Math.random() - 0.5) * 140) * (Math.PI / 180); // around -60deg
    const gravity = 480;
    const duration = 1.8 + Math.random() * 0.8;

    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    // Parametric: x = vx*t, y = vy*t + 0.5*g*t^2
    const proxy = { t: 0 };
    gsap.to(proxy, {
      t: duration,
      duration,
      ease: "none",
      onUpdate: () => {
        const t = proxy.t;
        const dx = vx * t;
        const dy = vy * t + 0.5 * gravity * t * t;
        dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${t * 360}deg)`;
        dot.style.opacity = String(Math.max(0, 1 - t / duration));
      },
      onComplete: () => dot.remove(),
    });
  }
}

function SkillsPage() {
  const burstLayer = useRef<HTMLDivElement>(null);

  const onChipClick = (e: React.MouseEvent<HTMLElement>) => {
    const layer = burstLayer.current;
    if (!layer) return;
    const rect = layer.getBoundingClientRect();
    physics2DBurst({ x: e.clientX - rect.left, y: e.clientY - rect.top }, layer);
  };

  // Auto-burst when title scrolls into view
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!titleRef.current || !burstLayer.current) return;
    const layer = burstLayer.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const rect = layer.getBoundingClientRect();
            physics2DBurst({ x: rect.width / 2, y: rect.height * 0.3 }, layer);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      <div
        ref={burstLayer}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Toolbelt</div>
        <h1 ref={titleRef} className="mt-3 text-5xl md:text-7xl font-bold tracking-tight">
          <ScrambleText as="span" className="text-rainbow" text="Skills" duration={1600} /> & stack.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Tap any chip to launch a Physics2D particle burst — gravity, velocity and angle,
          implemented in pure GSAP.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-2 gap-6">
        {skills.map((group, gi) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: gi * 0.05 }}
            whileHover={{ y: -4 }}
            className="glow-card p-7"
          >
            <h2 className="text-2xl font-bold">
              <span className="text-rainbow">{group.group}</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((s, i) => (
                <motion.button
                  type="button"
                  onClick={onChipClick}
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm rounded-full border-rainbow px-3 py-1.5 cursor-pointer"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="glow-card p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Always learning — currently exploring
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["LLM Agents", "RAG", "Edge AI", "Diffusion Models", "Model Optimization", "n8n Workflows"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={onChipClick}
                className="btn-ghost-rainbow text-sm cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
