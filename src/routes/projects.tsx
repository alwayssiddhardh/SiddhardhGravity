/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import { projects } from "@/lib/portfolio-data";
import ecom from "@/assets/proj-ecom.jpg";
// import hospital from "@/assets/proj-hospital.jpg";
import remote from "@/assets/proj-remoteSense.png";
import examcell from "@/assets/proj-examcell.jpg";
import todo from "@/assets/proj-todo.jpg";
import library from "@/assets/proj-library.jpg";
import derma from "@/assets/proj-derma.jpg";

const imageMap: Record<string, string> = {
  "MERN E-Commerce Platform": ecom,
  // "Hospital Landing Page": hospital,
  "Remote Sensing Satellite Image Detection": remote,
  "Exam Cell Management": examcell,
  "To-Do & Task Scheduling Mobile App": todo,
  "College E-Library": library,
  "Dermatology Clinic + Appointment Dashboard": derma,
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Siddhardha Ungarala" },
      { name: "description", content: "Full-stack and AI projects built by Siddhardha Ungarala." },
      { property: "og:title", content: "Projects — Siddhardha Ungarala" },
      { property: "og:description", content: "Selected work: AI, web and mobile projects." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Selected work · 2022 — 2025
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-5xl md:text-8xl font-bold tracking-tight"
        >
          <span className="text-shimmer">Case studies</span>
          <span className="block text-foreground/40 text-3xl md:text-5xl mt-2 font-medium">
            production · AI · full-stack
          </span>
        </motion.h1>

        <div className="mt-8 grid grid-cols-3 max-w-md gap-6">
          <Stat label="Projects" value="12+" />
          <Stat label="Shipped" value="100%" />
          <Stat label="Stacks" value="6" />
        </div>
      </section>

      <section ref={scrollRef} className="relative mx-auto max-w-6xl px-6 py-10">
        {/* Vertical progress rail */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-border">
          <motion.div
            style={{ height: lineH }}
            className="w-full bg-[var(--gradient-rainbow)] origin-top"
          />
        </div>

        <div className="space-y-32 md:space-y-44">
          {projects.map((p, i) => {
            const reverse = i % 2 === 1;
            const img = imageMap[p.title];
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                whileTap={{ scale: 0.97, rotate: [0, -1.5, 1.5, 0], transition: { duration: 0.6 } }}
                className={`relative grid md:grid-cols-2 gap-10 md:gap-16 items-center cursor-pointer ${reverse ? "md:[direction:rtl]" : ""}`}
              >
                {/* Numbered milestone */}
                <div className="hidden md:grid absolute left-1/2 -translate-x-1/2 -top-6 h-12 w-12 place-items-center rounded-full bg-background border-rainbow text-sm font-bold tracking-wider z-10">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: reverse ? 80 : -80, rotate: reverse ? 2 : -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="md:[direction:ltr] group"
                >
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-3xl bg-[var(--gradient-rainbow-soft)] blur-3xl opacity-40 group-hover:opacity-80 transition duration-700" />
                    <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl">
                      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-background/40">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--rainbow-1)]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--rainbow-3)]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--rainbow-4)]" />
                        <span className="ml-3 text-[10px] uppercase tracking-widest text-muted-foreground truncate">
                          {p.title.toLowerCase().replace(/\s+/g, "-")}.app
                        </span>
                      </div>
                      <motion.img
                        src={img}
                        alt={p.title}
                        width={1024}
                        height={640}
                        loading="lazy"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-[300px] md:h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reverse ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                  className="md:[direction:ltr]"
                >
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {p.date} · Case Study #{String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                    {p.description}
                  </p>

                  <div className="mt-6">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tech stack</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t, ti) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ti * 0.04 }}
                          whileHover={{ y: -3, scale: 1.06 }}
                          className="text-xs rounded-md border border-border bg-secondary px-2.5 py-1 font-mono"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex gap-3 flex-wrap">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn-rainbow text-sm group">
                        <Github className="h-4 w-4" /> View code
                        <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="btn-ghost-rainbow text-sm">
                        Live demo <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="text-3xl md:text-4xl font-bold text-rainbow">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

