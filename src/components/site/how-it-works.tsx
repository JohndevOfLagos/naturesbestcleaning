import { steps } from "@/data/site";
import { Reveal, SectionHeading } from "./reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="Four calm steps"
          subtitle="From first message to a space that finally feels light."
          light
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-7 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent lg:block"
          />
          <ol className="grid gap-10 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <li className="relative text-center lg:text-left">
                  <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-navy-deep font-display text-lg text-gold lg:mx-0">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl text-primary-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
