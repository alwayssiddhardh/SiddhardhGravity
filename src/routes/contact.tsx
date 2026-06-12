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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`Hello from ${fd.get("name")}`);
              const body = encodeURIComponent(`${fd.get("message")}\n\n— ${fd.get("name")} (${fd.get("email")})`);
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            }}
            className="space-y-3 pt-4 border-t border-border"
          >
            <h3 className="font-semibold">Quick message</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input name="name" required placeholder="Your name" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--rainbow-2)]" />
              <input name="email" required type="email" placeholder="Your email" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--rainbow-2)]" />
            </div>
            <textarea name="message" required rows={4} placeholder="What's on your mind?" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--rainbow-2)]" />
            <button type="submit" className="btn-rainbow">Send message</button>
          </form>
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
