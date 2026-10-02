import { Check, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { plans, pricingNote } from "@/data/site";
import { Reveal, SectionHeading } from "./reveal";
import { useQuote } from "./quote-context";

function whatsappQuoteLink(planName: string) {
  const text = encodeURIComponent(
    `Hi, I'd like a quote for ${planName} cleaning service`
  );
  return `https://wa.me/97450793043?text=${text}`;
}

export function Pricing() {
  const { requestQuote } = useQuote();

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Clear prices, no surprises"
          subtitle="Tell us your location and what you need — we reply fast with a clear, fixed price."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => {
            return (
              <Reveal key={plan.id} delay={i * 0.08}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7 transition-all duration-500 hover:-translate-y-2 ${
                    plan.popular
                      ? "border-gold shadow-lift ring-1 ring-gold/30"
                      : "border-border shadow-soft hover:border-gold/60"
                  }`}
                >
                  {plan.popular ? (
                    <span className="absolute top-6 -right-11 w-40 rotate-45 bg-gold py-1.5 text-center text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent-foreground">
                      Most Popular
                    </span>
                  ) : null}

                  <h3 className="text-xl text-navy">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>

                  <p className="mt-6 text-sm font-medium leading-relaxed text-navy">
                    Price varies by location — Get your free quote
                  </p>

                  <Button
                    asChild
                    variant="whatsapp"
                    size="pill"
                    className="mt-4 w-full"
                  >
                    <a
                      href={whatsappQuoteLink(plan.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-4" />
                      Get a Free Quote
                    </a>
                  </Button>

                  <div className="hairline my-6" />

                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-leaf" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "gold" : "navyOutline"}
                    size="pill"
                    className="mt-7 w-full"
                    onClick={() => requestQuote({ plan: plan.name })}
                  >
                    Get This Plan
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">{pricingNote}</p>
      </div>
    </section>
  );
}
