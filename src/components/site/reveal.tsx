import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2
        className={`mt-4 text-3xl leading-tight sm:text-4xl ${light ? "text-primary-foreground" : "text-navy"}`}
      >
        {title}
      </h2>
      <div className="hairline mx-auto mt-5 w-40" />
      {subtitle ? (
        <p className={`mt-5 text-base ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
