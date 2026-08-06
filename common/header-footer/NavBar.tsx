"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/utils";
import { NAV_LINKS } from "./data/data";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-1/2 top-6 z-50 -translate-x-1/2",
        "w-[92%] max-w-5xl rounded-full",
        "border border-white/15",
        "bg-white/10 backdrop-blur-md",
        "shadow-[0_10px_40px_rgba(0,0,0,0.15)]",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        showNav
          ? "translate-y-0 opacity-100"
          : "-translate-y-28 opacity-0",
        scrolled && "bg-white/70 shadow-2xl"
      )}
    >
      <nav
        className="flex h-16 items-center justify-between px-8"
        aria-label="Main navigation"
      >
        <a
          href="#hero"
          className="font-serif text-2xl font-semibold tracking-tight text-foreground"
        >
          RPRE
          <span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 md:inline-flex"
        >
          Start a Project
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {menuOpen && (
        <div className="rounded-b-3xl border-t border-white/10 bg-white/80 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Start a Project
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}