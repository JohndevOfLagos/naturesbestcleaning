import { motion, useScroll, useTransform } from "motion/react";
import { Leaf, Sparkles, Star } from "lucide-react";
import WhatsappIconIcon from "@iconify-react/logos/whatsapp-icon";

import { Button } from "@/components/ui/button";
import { company, trustChips } from "@/data/site";
import { useQuote } from "./quote-context";
import heroTeam from "@/assets/aEQWE.jpg";

const leaves = [
  { left: "6%", delay: 0, size: 22, duration: 19 },
  { left: "22%", delay: 4, size: 14, duration: 23 },
  { left: "41%", delay: 9, size: 18, duration: 21 },
  { left: "63%", delay: 2, size: 12, duration: 26 },
  { left: "78%", delay: 7, size: 20, duration: 20 },
  { left: "91%", delay: 12, size: 15, duration: 24 },
];

export function Hero() {
  const { requestQuote } = useQuote();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <section id="home" className="hero-surface relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <motion.div
        aria-hidden
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {leaves.map((leaf, i) => (
          <Leaf
            key={i}
            className="absolute bottom-0 text-gold/50 animate-float-leaf"
            style={{
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
            }}
          />
        ))}
        <Sparkles className="absolute top-32 right-[12%] size-6 text-gold/70 animate-shimmer" />
        <Sparkles
          className="absolute top-1/2 left-[8%] size-4 text-gold/60 animate-shimmer"
          style={{ animationDelay: "1.2s" }}
        />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy-deep/40 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
            <Leaf className="size-3.5" />
            {company.location}
          </span>

          <h1 className="mt-6 text-4xl leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
            We Don't Just Clean.
            <span className="mt-2 block">
              We Make Your{" "}
              <span className="font-script text-gold-gradient text-5xl leading-none sm:text-6xl lg:text-7xl">
                Space Exhale.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Professional cleaning • Quality service • Fresh results across Doha.
          </p>
          <p className="mt-3 font-display text-base italic text-primary-foreground/70">
            {company.clearMindLine}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="gold" size="xl" onClick={() => requestQuote()}>
              Get a Free Quote
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappIconIcon height="1em" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground/85 backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-gold/30 shadow-lift">
            <img
              src={heroTeam}
              alt="Nature's Best Cleaning team in uniform inside a bright Doha apartment"
              width={1280}
              height={1600}
              className="aspect-4/5 w-full object-cover"
            />
          </div>

          <div className="glass-panel absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-lift sm:left-8">
            <Sparkles className="size-5 text-gold" />
            <div>
              <p className="text-sm font-semibold text-navy">Same-day booking available</p>
              <p className="text-xs text-muted-foreground">Subject to team availability</p>
            </div>
          </div>

          <div className="glass-navy absolute -top-4 right-4 flex items-center gap-2 rounded-full px-4 py-2 sm:right-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-gold text-gold" />
            ))}
            <span className="text-xs font-medium text-primary-foreground">5.0 rated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
