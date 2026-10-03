import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Contact } from "@/components/site/contact";
import { FaqSection } from "@/components/site/faq-section";
import { FloatingSupport } from "@/components/site/floating-support";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { Navbar } from "@/components/site/navbar";
import { Pricing } from "@/components/site/pricing";
import { QuoteProvider } from "@/components/site/quote-context";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { TrustStrip } from "@/components/site/trust-strip";
import { WhyUs } from "@/components/site/why-us";
import { company } from "@/data/site";

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
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: company.name,
    description: company.tagline,
    url: company.websiteUrl,
    telephone: company.phone,
    areaServed: { "@type": "City", name: "Doha" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Doha",
      addressRegion: "Doha",
      addressCountry: "QA",
    },
    priceRange: "QAR 150 - QAR 500+",
  };

  return (
    <QuoteProvider>
  <div className="min-h-screen overflow-x-clip bg-background pb-[calc(4.25rem+env(safe-area-inset-bottom))] text-foreground lg:pb-0">
        <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
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
        <FloatingSupport showTop={showTop} />
      </div>
    </QuoteProvider>
  );
}
