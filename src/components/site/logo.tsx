import logo from "@/assets/logo.png";
import { company } from "@/data/site";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label={`${company.name} home`}>
      <img
        src={logo}
        alt={`${company.name} logo — a house with a leaf inside a gold crescent`}
        width={48}
        height={48}
        className={compact ? "h-9 w-9" : "h-11 w-11"}
      />
      <span className="leading-none">
        <span
          className={`block font-display text-base font-semibold tracking-wide sm:text-lg ${
            light ? "text-primary-foreground" : "text-navy"
          }`}
        >
          Nature's Best
        </span>
        <span className="mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.34em] text-gold">
          Cleaning
        </span>
      </span>
    </a>
  );
}
