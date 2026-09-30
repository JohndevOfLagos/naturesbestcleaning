import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/site";
import { Reveal, SectionHeading } from "./reveal";

export function FaqSection() {
  return (
    <section id="faq" className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Good questions, honest answers"
          subtitle="Still unsure about something? Message us on WhatsApp and ask."
        />

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="mb-3 overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft"
              >
                <AccordionTrigger className="text-left font-display text-base text-navy hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
