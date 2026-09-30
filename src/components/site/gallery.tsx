import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

import { Reveal, SectionHeading } from "./reveal";
import before from "@/assets/before-kitchen.jpg";
import after from "@/assets/after-kitchen.jpg";
import bathroom from "@/assets/gallery-bathroom.jpg";
import team from "@/assets/hero-team.jpg";

const grid = [
  { src: bathroom, alt: "Polished marble bathroom after a deep clean in Doha" },
  { src: after, alt: "Spotless kitchen island after a Nature's Best deep clean" },
  { src: team, alt: "Uniformed Nature's Best cleaning team with professional equipment" },
];

export function Gallery() {
  const [position, setPosition] = useState(55);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <section id="gallery" className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Before & After"
          title="See the difference"
          subtitle="Drag the handle to reveal what a full deep clean actually changes."
        />

        <Reveal delay={0.1}>
          <div
            ref={containerRef}
            className="relative mt-14 aspect-3/2 w-full cursor-ew-resize touch-none overflow-hidden rounded-3xl border border-gold/30 shadow-lift select-none"
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
          >
            <img
              src={after}
              alt="Kitchen after professional deep cleaning"
              loading="lazy"
              width={1280}
              height={854}
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
              aria-hidden
            >
              <img
                src={before}
                alt="Kitchen before cleaning"
                loading="lazy"
                width={1280}
                height={854}
                className="absolute inset-0 h-full w-auto min-w-full object-cover"
                style={{ width: containerRef.current?.offsetWidth ?? undefined }}
              />
            </div>

            <span className="absolute top-4 left-4 rounded-full bg-navy-deep/75 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground backdrop-blur-sm">
              Before
            </span>
            <span className="absolute top-4 right-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground">
              After
            </span>

            <div
              className="absolute inset-y-0 w-px bg-gold"
              style={{ left: `${position}%` }}
              aria-hidden
            >
              <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-card text-gold shadow-lift">
                <MoveHorizontal className="size-5" />
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(position)}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-label="Reveal before and after"
              className="sr-only"
            />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {grid.map((image, i) => (
            <Reveal key={image.alt} delay={0.1 + i * 0.08}>
              <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
