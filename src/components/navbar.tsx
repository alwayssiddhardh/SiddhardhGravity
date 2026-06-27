/* eslint-disable prettier/prettier */
import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";
const Logo = "/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-full px-4 py-2.5 shadow-lg">
          <Link to="/" className="flex items-center gap-2 font-bold group">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl overflow-hidden ring-1 ring-border bg-background shadow-[0_8px_20px_-6px_var(--rainbow-2)] transition-transform duration-500 group-hover:rotate-[360deg]">
              <img src={Logo} alt="S" className="h-7 w-7 object-contain" />
            </span>
            <span className="text-rainbow text-base tracking-tight">siddhardha<span className="text-foreground/50">.ai</span></span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  activeProps={{
                    className:
                      "relative rounded-full px-4 py-1.5 text-sm font-semibold text-foreground bg-[color-mix(in_oklab,var(--rainbow-2)_15%,transparent)]",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border-rainbow text-foreground transition hover:scale-110"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-border"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden glass mt-2 rounded-2xl p-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
