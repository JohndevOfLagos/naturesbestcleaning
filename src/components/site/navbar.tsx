import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { company, navLinks } from "@/data/site";
import { useQuote } from "./quote-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { requestQuote } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel shadow-soft" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo light={!scrolled} compact />

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 ${
                  scrolled
                    ? "text-navy hover:text-gold"
                    : "text-primary-foreground/85 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={company.phoneHref}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              scrolled ? "text-navy hover:text-gold" : "text-primary-foreground/85 hover:text-gold"
            }`}
          >
            <Phone className="size-4" />
            {company.phone}
          </a>
          <Button variant="gold" size="pill" onClick={() => requestQuote()}>
            Get a Free Quote
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full p-2 transition-colors xl:hidden ${
            scrolled ? "text-navy" : "text-primary-foreground"
          }`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div className="glass-panel border-t xl:hidden">
          <div className="flex items-center justify-between px-5 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-navy"
            >
              <X className="size-5" />
            </button>
          </div>
          <ul className="px-5 py-4">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-border/60 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-6">
            <Button
              variant="gold"
              size="pill"
              className="w-full"
              onClick={() => {
                setOpen(false);
                requestQuote();
              }}
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
