import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Bubbles } from "@/components/bubbles";
import ecom from "@/assets/proj-ecom.jpg";
import hospital from "@/assets/proj-hospital.jpg";
import examcell from "@/assets/proj-examcell.jpg";
import todo from "@/assets/proj-todo.jpg";
import library from "@/assets/proj-library.jpg";
import derma from "@/assets/proj-derma.jpg";

const imageMap: Record<string, string> = {
  "MERN E-Commerce Platform": ecom,
  "Hospital Landing Page": hospital,
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
  return (
    <div className="relative">
      <Bubbles count={16} />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Selected work</div>
        <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight">
          <span className="text-rainbow">Projects</span> I'm proud of.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A mix of AI, full-stack and mobile builds — each one shipped, polished and battle-tested.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 space-y-24">
        {projects.map((p, i) => {
          const reverse = i % 2 === 1;
          const img = imageMap[p.title];
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, x: reverse ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="md:[direction:ltr]"
              >
                <div className="relative group">
                  <div className="absolute -inset-3 rounded-3xl bg-[var(--gradient-rainbow-soft)] blur-2xl opacity-70 group-hover:opacity-100 transition" />
                  <div className="relative rounded-3xl overflow-hidden border-rainbow shadow-[var(--shadow-glow)]">
                    <img
                      src={img}
                      alt={p.title}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-[340px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: reverse ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
                className="md:[direction:ltr]"
              >
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {p.date}
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="mt-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Tech used</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs rounded-full border-rainbow px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <a href="https://github.com/siddhardhaungarala" target="_blank" rel="noreferrer" className="btn-ghost-rainbow text-sm">
                    View on GitHub <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
}
