import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experiences, certifications } from "@/lib/portfolio-data";
import { Bubbles } from "@/components/bubbles";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Siddhardha Ungarala" },
      { name: "description", content: "Internships, workshops and community work by Siddhardha Ungarala." },
      { property: "og:title", content: "Experience — Siddhardha Ungarala" },
      { property: "og:description", content: "Career timeline: internships, workshops and leadership." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div className="relative">
      <Bubbles count={14} />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Journey</div>
        <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight">
          The <span className="text-rainbow">timeline</span>.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Internships, workshops and community work — every node is a project of its own.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 relative">
        {/* Vertical rainbow line */}
        <div
          aria-hidden
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[var(--gradient-rainbow)] opacity-80"
        />
        <div className="space-y-16">
          {experiences.map((e, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={e.role + e.company}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${isRight ? "" : ""}`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 grid place-items-center">
                  <div className="h-4 w-4 rounded-full bg-[var(--gradient-rainbow)] shadow-[0_0_0_4px_var(--background)] animate-pulse-ring" />
                </div>

                <div className={`pl-14 md:pl-0 ${isRight ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                  <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {e.period}
                  </div>
                  <h2 className="mt-2 text-2xl font-bold">{e.role}</h2>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground" style={{ justifyContent: isRight ? "flex-end" : "flex-start" }}>
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {e.company}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.location}</span>
                  </div>
                  <div className="mt-1 text-xs text-rainbow font-semibold">{e.type}</div>
                </div>

                <div className={`pl-14 md:pl-0 mt-4 md:mt-0 ${isRight ? "md:col-start-2 md:pl-12" : "md:row-start-1 md:pr-12 md:text-right"}`}>
                  <div className="glow-card p-6">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-left">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--rainbow-1)] flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="text-xs rounded-full border-rainbow px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="text-rainbow">Certifications</span>
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glow-card p-5"
            >
              <div className="text-sm font-medium">{c}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
