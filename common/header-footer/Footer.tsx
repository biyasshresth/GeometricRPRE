import { NAV_LINKS } from "./data/data";

const SOCIAL_LINKS = ["Twitter / X", "LinkedIn", "Dribbble", "GitHub"] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white index-0 z-10">
      <div className="mx-auto max-w-6xl px-6 py-16 bg-white">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              RPRE<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A digital studio crafting elegant, high-performance websites and
              immersive web experiences.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Follow
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RPRE Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed &amp; built with care by RPRE
          </p>
        </div>
      </div>
    </footer>
  );
}
