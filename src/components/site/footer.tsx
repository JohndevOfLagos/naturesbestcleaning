import { MapPin, MessageCircle, Phone } from "lucide-react";

import { company, navLinks } from "@/data/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 pb-28 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-sm font-display text-lg text-primary-foreground/90">
              {company.tagline}
            </p>
            <p className="mt-3 text-sm text-gold">{company.subline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`${company.name} on ${social.label}`}
                  className="rounded-full border border-gold/30 px-4 py-1.5 text-xs text-primary-foreground/75 transition-colors hover:border-gold hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Quick links</h3>
            <ul className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MessageCircle className="size-4 text-gold" />
                  {company.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold" />
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-gold" />
                {company.location}
              </li>
              <li>
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {company.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-primary-foreground/55 sm:flex-row">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <p className="text-gold/80">{company.motto}</p>
        </div>
      </div>
    </footer>
  );
}
