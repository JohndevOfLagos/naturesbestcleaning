import { Building2, Home, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/data/site";
import { Reveal, SectionHeading } from "./reveal";
import { useQuote } from "./quote-context";

const icons = {
  home: Home,
  sparkles: Sparkles,
  truck: Truck,
  building: Building2,
} as const;

export function Services() {
  const { requestQuote } = useQuote();

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Care shaped around your space"
          subtitle="Four ways we work, each delivered by a uniformed team with professional equipment."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={i * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-lift">
                  <span className="flex size-13 items-center justify-center rounded-2xl border border-gold/35 bg-secondary text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-accent-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl text-navy">{service.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Button
                    variant="goldOutline"
                    size="pill"
                    className="mt-6 w-full"
                    onClick={() => requestQuote({ service: service.name })}
                  >
                    Book This Service
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
