import { Quote, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/site";
import { Reveal, SectionHeading } from "./reveal";

export function Testimonials() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="What Doha says about us"
          subtitle="Homes, apartments and offices across the city."
        />

        <Reveal delay={0.1}>
          <Carousel opts={{ align: "start", loop: true }} className="mt-14">
            <CarouselContent className="-ml-4">
              {testimonials.map((item) => (
                <CarouselItem key={item.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                    <Quote className="size-7 text-gold/60" />
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      "{item.quote}"
                    </blockquote>
                    <div className="mt-6 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <figcaption className="mt-3">
                      <span className="block text-sm font-semibold text-navy">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">{item.role}</span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-3">
              <CarouselPrevious className="static translate-y-0 border-gold/50 text-gold" />
              <CarouselNext className="static translate-y-0 border-gold/50 text-gold" />
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
