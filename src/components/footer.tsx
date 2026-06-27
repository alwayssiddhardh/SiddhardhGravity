/* eslint-disable prettier/prettier */
import { Github, Linkedin, Instagram, Mail, Globe, Twitter, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/lib/portfolio-data";
const Logo = "/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border overflow-hidden">
      {/* Top rainbow rail */}
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--gradient-rainbow)] opacity-80" />
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full blur-3xl opacity-40"
        style={{ background: "var(--gradient-rainbow)" }}
      />

      {/* Giant wordmark */}
      <div className="relative mx-auto max-w-6xl px-6 pt-16">
        <div className="text-[18vw] md:text-[10rem] leading-[0.85] font-black tracking-tighter text-rainbow select-none">
          siddhardha
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <span className="grid h-12 w-12 place-items-center rounded-2xl overflow-hidden ring-1 ring-border bg-background shadow-[0_8px_24px_-6px_var(--rainbow-2)] transition-transform duration-500 group-hover:rotate-[360deg]">
              <img src={Logo} alt="Logo" className="h-9 w-9 object-contain" />
            </span>
            <span>
              <div className="font-bold tracking-tight text-rainbow text-lg">siddhardha.ai</div>
              <div className="text-xs text-muted-foreground">AI / ML Engineer · Builder</div>
            </span>
          </Link>
          <p className="mt-5 text-sm text-muted-foreground max-w-sm">
            Crafting intelligent systems and immersive interfaces. Always building, always shipping.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Navigate</div>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="group inline-flex items-center gap-1.5 text-sm hover:text-rainbow transition">
                  {n.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Get in touch</div>
          <a href={`mailto:${profile.email}`} className="mt-4 block text-lg font-semibold hover:text-rainbow transition">
            {profile.email}
          </a>
          <div className="mt-5 flex items-center gap-2">
            {[
              { Icon: Github, href: profile.socials.github, label: "GitHub" },
              { Icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
              { Icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
              { Icon: Twitter, href: profile.socials.twitter, label: "Twitter" },
              { Icon: Globe, href: profile.socials.portfolio, label: "Portfolio" },
              { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-transparent hover:bg-[var(--gradient-rainbow)] hover:text-white hover:scale-110 hover:-translate-y-1 transition duration-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} <span className="text-rainbow font-semibold">{profile.name}</span>. Built with React, Three.js & a lot of rainbow.</p>
        <p className="font-mono">v2.0 · status: <span className="text-[var(--rainbow-4)]">● online</span></p>
      </div>
    </footer>
  );
}
