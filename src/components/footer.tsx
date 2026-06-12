import { Github, Linkedin, Instagram, Mail, Globe, Twitter } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--gradient-rainbow)] opacity-70" />
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-rainbow font-semibold">{profile.name}</span>.
          Built with React, Three.js & a lot of rainbow.
        </p>
        <div className="flex items-center gap-3">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-rainbow"><Github className="h-4 w-4" /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-rainbow"><Linkedin className="h-4 w-4" /></a>
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-rainbow"><Instagram className="h-4 w-4" /></a>
          <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-rainbow"><Twitter className="h-4 w-4" /></a>
          <a href={profile.socials.portfolio} target="_blank" rel="noreferrer" className="hover:text-rainbow"><Globe className="h-4 w-4" /></a>
          <a href={`mailto:${profile.email}`} className="hover:text-rainbow"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
