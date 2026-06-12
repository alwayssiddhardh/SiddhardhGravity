import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { skills } from "@/lib/portfolio-data";
import { Bubbles } from "@/components/bubbles";

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

function SkillsPage() {
  return (
    <div className="relative">
      <Bubbles count={14} />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Toolbelt</div>
        <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight">
          <span className="text-rainbow">Skills</span> & stack.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          What I reach for when building intelligent, beautiful, fast products.
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
            className="glow-card p-7"
          >
            <h2 className="text-2xl font-bold">
              <span className="text-rainbow">{group.group}</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="text-sm rounded-full border-rainbow px-3 py-1.5 cursor-default"
                >
                  {s}
                </motion.span>
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
              <span key={t} className="btn-ghost-rainbow text-sm cursor-default">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
