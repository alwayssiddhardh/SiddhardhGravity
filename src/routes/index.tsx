import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Sparkles, Cpu, Code2, Rocket } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
const Hero3D = lazy(() => import("@/components/hero-3d").then((m) => ({ default: m.Hero3D })));
import { Bubbles } from "@/components/bubbles";
import { profile, projects, skills, RESUME_URL } from "@/lib/portfolio-data";
import avatar from "@/assets/avatar.jpg";

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
      { property: "og:description", content: "Crazy, AI-powered portfolio with 3D + rainbow vibes." },
    ],
  }),
  component: Home,
});

function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <Bubbles count={22} />
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center pt-10">
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Available for AI / ML internships & freelance
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              I build <span className="text-rainbow">crazy</span> AI things —
              <br /> the kind that <span className="text-rainbow">flex</span>.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              {profile.tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-rainbow">
                See projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={RESUME_URL}
                download="Siddhardha_Ungarala_Resume.pdf"
                className="btn-ghost-rainbow"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <img
                src={avatar}
                alt="Siddhardha"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full ring-2 ring-[var(--rainbow-2)] object-cover"
              />
              <div className="text-sm">
                <div className="font-semibold">{profile.name}</div>
                <div className="text-muted-foreground">{profile.title}</div>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[420px] md:h-[520px]">
            <div className="absolute inset-0 rounded-3xl border border-border glass overflow-hidden">
              <Hero3D />
            </div>
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[var(--gradient-rainbow-soft)] blur-2xl opacity-70" />
          </div>
        </div>
      </section>

      {/* MARQUEE TAGS */}
      <section className="relative py-10 overflow-hidden">
        <div className="flex gap-8 animate-[float-y_8s_ease-in-out_infinite] text-2xl md:text-3xl font-semibold whitespace-nowrap justify-center flex-wrap px-6">
          <span className="text-rainbow">Python</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-rainbow">TensorFlow</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-rainbow">React</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-rainbow">YOLO</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-rainbow">AWS</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-rainbow">Flutter</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-20">
        <Bubbles count={14} />
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            kicker="What I do"
            title={<>Engineering at the intersection of <span className="text-rainbow">AI, design and ship-it energy</span>.</>}
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glow-card p-7 hover:[&]:[transform:translateY(-6px)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-rainbow)] text-white shadow-lg">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative py-20">
        <Bubbles count={10} />
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
                className="glow-card p-6"
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.date}</div>
                <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs rounded-full border border-border px-2 py-1">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS PREVIEW */}
      <section className="relative py-20">
        <Bubbles count={12} />
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading kicker="Stack" title={<>A toolbelt tuned for <span className="text-rainbow">intelligent products</span>.</>} />
          <div className="mt-10 flex flex-wrap gap-2">
            {skills.flatMap((s) => s.items).map((s) => (
              <span
                key={s}
                className="text-sm rounded-full border-rainbow px-3 py-1.5 hover:scale-105 transition"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/skills" className="btn-ghost-rainbow">Full skills page <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Got an <span className="text-rainbow">idea</span> that needs an AI brain?
          </h2>
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
