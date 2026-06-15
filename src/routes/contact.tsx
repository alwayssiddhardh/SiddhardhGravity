import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, Globe, Download, FileText } from "lucide-react";
import { profile, RESUME_URL } from "@/lib/portfolio-data";
import { Bubbles } from "@/components/bubbles";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Siddhardha Ungarala" },
      { name: "description", content: "Get in touch with Siddhardha Ungarala. Email, phone, socials and resume." },
      { property: "og:title", content: "Contact — Siddhardha Ungarala" },
      { property: "og:description", content: "Email, socials and resume preview / download." },
    ],
  }),
  component: ContactPage,
});

const socials = [
  { Icon: Github, label: "GitHub", href: profile.socials.github },
  { Icon: Linkedin, label: "LinkedIn", href: profile.socials.linkedin },
  { Icon: Instagram, label: "Instagram", href: profile.socials.instagram },
  { Icon: Twitter, label: "X / Twitter", href: profile.socials.twitter },
  { Icon: Globe, label: "Portfolio", href: profile.socials.portfolio },
];

function ContactPage() {
  return (
    <div className="relative">
      <Bubbles count={18} />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Say hi</div>
        <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight">
          Let's <span className="text-rainbow">build</span> something.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Got a role, a project, or an experiment? I'm a fast reply away.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 grid lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glow-card p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold">Contact details</h2>

          <div className="space-y-4">
            <ContactRow Icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow Icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
            <ContactRow Icon={MapPin} label="Location" value={profile.location} />
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Find me online</div>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-rainbow text-sm"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Disabled "Quick message" — creatively offline */}
          <div className="pt-4 border-t border-border">
            <div
              aria-disabled="true"
              className="relative overflow-hidden rounded-2xl border border-dashed border-border/70 bg-gradient-to-br from-background/60 to-background/20 p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--rainbow-1) 0 1px, transparent 1px 10px)",
                  animation: "scanShift 14s linear infinite",
                }}
              />
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--gradient-rainbow-soft)] blur-3xl opacity-60" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--gradient-rainbow)] text-white shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--rainbow-1)] animate-pulse" />
                    Quick message · temporarily offline
                  </div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                    <span className="text-shimmer">I'll get to you soon ✦</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    The inline composer is napping while I rewire it with something prettier.
                    Until then — fire a note straight to my inbox, I read every one.
                  </p>

                  <div className="mt-5 space-y-2 select-none pointer-events-none">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="h-9 rounded-xl border border-dashed border-border bg-background/40 px-3 flex items-center text-xs text-muted-foreground/60">Your name</div>
                      <div className="h-9 rounded-xl border border-dashed border-border bg-background/40 px-3 flex items-center text-xs text-muted-foreground/60">Your email</div>
                    </div>
                    <div className="h-20 rounded-xl border border-dashed border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground/60">What's on your mind?</div>
                    <button type="button" disabled className="mt-1 inline-flex items-center gap-2 rounded-xl border border-dashed border-border bg-background/40 px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground/70 cursor-not-allowed">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--rainbow-3)] animate-pulse" />
                      sending… disabled
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <a href={`mailto:${profile.email}`} className="btn-rainbow text-sm">
                      <Mail className="h-4 w-4" /> Email me instead
                    </a>
                    <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="btn-ghost-rainbow text-sm">
                      <Linkedin className="h-4 w-4" /> DM on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resume preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glow-card p-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-rainbow" />
              <h2 className="text-xl font-bold">Resume</h2>
            </div>
            <div className="flex gap-2">
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-ghost-rainbow text-sm">Open</a>
              <a href={RESUME_URL} download="Siddhardha_Ungarala_Resume.pdf" className="btn-rainbow text-sm">
                <Download className="h-4 w-4" /> Download
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border bg-background h-[680px]">
            <iframe
              src={`${RESUME_URL}#view=FitH`}
              title="Siddhardha Ungarala Resume"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function ContactRow({
  Icon, label, value, href,
}: { Icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--gradient-rainbow)] text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition">{content}</a>
  ) : content;
}
