import { createFileRoute } from "@tanstack/react-router";

import { QuoteProvider } from "@/components/site/quote-context";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Pricing } from "@/components/site/pricing";
import { HowItWorks } from "@/components/site/how-it-works";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { FaqSection } from "@/components/site/faq-section";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nature's Best Cleaning | Professional Cleaning in Doha, Qatar" },
      {
        name: "description",
        content:
          "Premium home, deep, move-in/out and office cleaning in Al Muntaza, Doha. Vetted cleaners, transparent quotes, satisfaction guaranteed. Get your free quote today.",
      },
      {
        property: "og:title",
        content: "Nature's Best Cleaning | Professional Cleaning in Doha, Qatar",
      },
      {
        property: "og:description",
        content:
          "Premium home, deep, move-in/out and office cleaning in Al Muntaza, Doha. Vetted cleaners, transparent quotes, satisfaction guaranteed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <QuoteProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <WhyUs />
          <Pricing />
          <HowItWorks />
          <Gallery />
          <Testimonials />
          <FaqSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </QuoteProvider>
  );
}
