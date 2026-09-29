import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Prefill = { service?: string; plan?: string };

type QuoteContextValue = {
  prefill: Prefill;
  requestQuote: (prefill?: Prefill) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({});

  const requestQuote = useCallback((next?: Prefill) => {
    if (next) setPrefill(next);
    if (typeof document !== "undefined") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const value = useMemo(() => ({ prefill, requestQuote }), [prefill, requestQuote]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}
