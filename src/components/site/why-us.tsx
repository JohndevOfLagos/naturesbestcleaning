import { BadgeCheck, CalendarClock, Leaf, Receipt, ShieldCheck, Wrench } from "lucide-react";

import { benefits } from "@/data/site";
import { Reveal, SectionHeading } from "./reveal";

const icons = {
  wrench: Wrench,
  shield: ShieldCheck,
  leaf: Leaf,
  calendar: CalendarClock,
  receipt: Receipt,
  badge: BadgeCheck,
} as const;

export function WhyUs() {
  return (
    <section id="why-us" className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The details other cleaners skip"
          subtitle="Equipment, training and products chosen so the result lasts longer than the visit."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = icons[benefit.icon];
            return (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors duration-500 hover:border-gold/60">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg text-navy">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
