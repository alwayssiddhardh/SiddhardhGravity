import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Sparkles, Cpu, Code2, Rocket } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
const Hero3D = lazy(() => import("@/components/hero-3d").then((m) => ({ default: m.Hero3D })));
import { profile, projects, skills, RESUME_URL } from "@/lib/portfolio-data";
import avatar from "@/assets/avatar.jpg";
import { ScrambleText } from "@/components/scramble-text";
import { MorphShape } from "@/components/morph-shape";
import { MorphIcon } from "@/components/morph-icon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siddhardha Ungarala — AI/ML Engineer & Builder" },
      {
        name: "description",
        content:
          "AI & ML engineer crafting production interfaces. Explore projects, experience and the work behind the work.",
      },
      { property: "og:title", content: "Siddhardha Ungarala — AI/ML Engineer" },
      { property: "og:description", content: "Futuristic AI portfolio — Earth-grade visuals, ScrambleText hero, MorphSVG, smooth scroll." },
    ],
  }),
  component: Home,
});

function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const heroRot = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center pt-10">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium"
            >
              <Sparkles className="h-3.5 w-3.5" /> Available for AI / ML internships & freelance
            </motion.div>

            <h1 className="mt-5 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              <ScrambleText
                as="span"
                className="block text-shimmer"
                text="Siddhardha Ungarala"
                duration={2200}
              />
              <span className="block text-foreground mt-2">
                I build{" "}
                <ScrambleText as="span" className="text-rainbow" text="crazy" duration={1600} />
                {" "}AI things.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link to="/projects" className="btn-rainbow group">
                See projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={RESUME_URL}
                download="Siddhardha_Ungarala_Resume.pdf"
                className="btn-ghost-rainbow"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8 flex items-center gap-3"
            >
              <img
                src={avatar}
                alt="Siddhardha"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full ring-2 ring-[var(--rainbow-2)] object-cover animate-pulse-ring"
              />
              <div className="text-sm">
                <div className="font-semibold">{profile.name}</div>
                <div className="text-muted-foreground">{profile.title}</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ rotate: heroRot }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-[420px] md:h-[560px]"
          >
            <div className="absolute inset-0 rounded-3xl border border-border overflow-hidden bg-background">
              {mounted ? (
                <Suspense fallback={<div className="h-full w-full bg-background" />}>
                  <Hero3D />
                </Suspense>
              ) : (
                <div className="h-full w-full bg-background" />
              )}
            </div>

            {/* Rotating ring decoration */}
            <div className="pointer-events-none absolute inset-[-20px] rounded-[2rem] border border-dashed border-foreground/10 animate-ring-spin" />
            <div className="pointer-events-none absolute inset-[-40px] rounded-[2.2rem] border border-dashed border-foreground/5 animate-ring-spin" style={{ animationDirection: "reverse", animationDuration: "32s" }} />
          </motion.div>
        </div>
      </section>

      {/* SCROLLING MARQUEE STACK */}
      <section className="relative py-12 overflow-hidden border-y border-border">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-2xl md:text-4xl font-bold uppercase tracking-tight">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Python", "TensorFlow", "React", "YOLO", "AWS", "Flutter", "OpenCV", "Firebase", "Node.js", "TypeScript"].map((w, i) => (
                <span key={w + k} className={i % 2 === 0 ? "text-foreground/90" : "text-rainbow"}>
                  {w} ✦
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* MORPH SHAPE SHOWCASE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-md mx-auto md:mx-0"
          >
            <MorphShape className="absolute inset-0 w-full h-full" />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--rainbow-2)_22%,transparent),transparent_60%)] blur-2xl" />
          </motion.div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Identity in motion</div>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              Shapes that <span className="text-rainbow">morph</span>, ideas that ship.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Like the SVG dancing beside this text, my work morphs to whatever the problem
              demands — from research-grade ML to production interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            kicker="What I do"
            title={<>Engineering at the intersection of <span className="text-rainbow">AI, design and ship-it energy</span>.</>}
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((f, i) => (
              <FeatureCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <SectionHeading kicker="Featured work" title={<>Things I built that <span className="text-rainbow">shipped</span>.</>} />
            <Link to="/projects" className="btn-ghost-rainbow">All projects <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {projects.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -8, rotateX: 3, rotateY: -3, scale: 1.02 }}
                whileTap={{ scale: 0.94, rotate: [0, -2, 2, 0], transition: { duration: 0.5 } }}
                style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
                className="glow-card p-6 cursor-pointer relative overflow-hidden"
              >
                <div className="pointer-events-none absolute -inset-1 opacity-0 hover:opacity-100 transition duration-500" style={{ background: "var(--gradient-rainbow-soft)", filter: "blur(40px)" }} />
                <div className="relative">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.date}</div>
                  <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs rounded-full border border-border px-2 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS PREVIEW */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading kicker="Stack" title={<>A toolbelt tuned for <span className="text-rainbow">intelligent products</span>.</>} />
          <div className="mt-10 flex flex-wrap gap-2">
            {skills.flatMap((s) => s.items).map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.015 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="text-sm rounded-full border-rainbow px-3 py-1.5"
              >
                {s}
              </motion.span>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/skills" className="btn-ghost-rainbow">Full skills page <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Got an <span className="text-rainbow">idea</span> that needs an AI brain?
          </motion.h2>
          <p className="mt-4 text-muted-foreground">Let's build it together. Reach out — I reply fast.</p>
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Link to="/contact" className="btn-rainbow">Contact me <ArrowRight className="h-4 w-4" /></Link>
            <a href={RESUME_URL} download="Siddhardha_Ungarala_Resume.pdf" className="btn-ghost-rainbow">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  { icon: Cpu, title: "AI / ML systems", desc: "Computer vision, NLP, and applied ML using TensorFlow, YOLO, CLIP, SAM and OpenCV." },
  { icon: Code2, title: "Full-stack web", desc: "React, TypeScript, Node, Firebase and MongoDB — APIs to interface, end to end." },
  { icon: Rocket, title: "Shipping mindset", desc: "I obsess over the last 10% — polish, performance, and a UI people brag about." },
];

function SectionHeading({ kicker, title }: { kicker: string; title: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{kicker}</div>
      <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">{title}</h2>
    </div>
  );
}
