import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Facebook,
  Globe,
  Instagram,
  Loader2,
  MapPin,
  Music2,
  Phone,
  Send,
  TriangleAlert,
  Youtube,
} from "lucide-react";
import WhatsappIconIcon from "@iconify-react/logos/whatsapp-icon";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company, plans, propertyTypes, serviceOptions } from "@/data/site";
import { quoteSchema, submitQuote, type QuoteInput } from "@/lib/quote.functions";
import { Reveal, SectionHeading } from "./reveal";
import { useQuote } from "./quote-context";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none";

const socialIcons = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  TikTok: Music2,
} as const;

export function Contact() {
  const { prefill } = useQuote();
  const send = useServerFn(submitQuote);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      plan: "",
      propertyType: "",
      preferredDate: "",
      message: "",
      honeypot: "",
      source: "website-form",
    },
  });

  const { register, handleSubmit, formState, reset, setValue } = form;

  useEffect(() => {
    if (prefill.service) setValue("service", prefill.service);
    if (prefill.plan) {
      setValue("plan", prefill.plan);
      if (!prefill.service) {
        const match = serviceOptions.find((option) =>
          prefill.plan?.includes(option.split(" ")[0]!),
        );
        if (match) setValue("service", match);
      }
    }
  }, [prefill, setValue]);

  const onSubmit = async (values: QuoteInput) => {
    setStatus("idle");
    try {
      await send({ data: values });
      setStatus("success");
      reset({ ...form.getValues(), fullName: "", phone: "", email: "", message: "" });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong sending your request.",
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get your free quote"
          subtitle="Tell us about your space. We reply quickly with a clear price and available slots."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <CheckCircle2 className="size-14 text-leaf" />
                  <h3 className="mt-5 text-2xl text-navy">Thank you! We'll reach out shortly.</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Your request is with our team. Want to talk right now? WhatsApp us.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button variant="whatsapp" size="pill" asChild>
                      <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <WhatsappIconIcon height="1em" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                    <Button variant="navyOutline" size="pill" onClick={() => setStatus("idle")}>
                      Send another request
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="hidden"
                    {...register("honeypot")}
                  />

                  <div className="sm:col-span-1">
                    <Label htmlFor="fullName">Full name *</Label>
                    <Input
                      id="fullName"
                      className="mt-2"
                      placeholder="Your name"
                      {...register("fullName")}
                    />
                    {formState.errors.fullName ? (
                      <p className="mt-1.5 text-xs text-destructive">
                        {formState.errors.fullName.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-2"
                      placeholder="+974 ..."
                      {...register("phone")}
                    />
                    {formState.errors.phone ? (
                      <p className="mt-1.5 text-xs text-destructive">
                        {formState.errors.phone.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2"
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    {formState.errors.email ? (
                      <p className="mt-1.5 text-xs text-destructive">
                        {formState.errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="service">Service</Label>
                    <select id="service" className={`mt-2 ${selectClass}`} {...register("service")}>
                      <option value="">Choose a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property type</Label>
                    <select
                      id="propertyType"
                      className={`mt-2 ${selectClass}`}
                      {...register("propertyType")}
                    >
                      <option value="">Choose a type</option>
                      {propertyTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="plan">Plan (optional)</Label>
                    <select id="plan" className={`mt-2 ${selectClass}`} {...register("plan")}>
                      <option value="">Choose a plan</option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.name}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="preferredDate">Preferred date</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      className="mt-2"
                      {...register("preferredDate")}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="mt-2"
                      placeholder="Size of the property, rooms, anything we should know…"
                      {...register("message")}
                    />
                  </div>

                  {status === "error" ? (
                    <div className="sm:col-span-2 flex flex-col gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="flex items-start gap-2 text-sm text-destructive">
                        <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                        {errorMessage}
                      </p>
                      <Button variant="whatsapp" size="sm" className="rounded-full" asChild>
                        <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer">
                          Chat with us on WhatsApp instead
                        </a>
                      </Button>
                    </div>
                  ) : null}

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      variant="gold"
                      size="xl"
                      className="w-full"
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="size-5" />
                          Send my request
                        </>
                      )}
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      We never share your details. Reply usually within the hour.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6 rounded-3xl bg-navy p-7 shadow-lift">
              <div>
                <h3 className="text-xl text-primary-foreground">Talk to us directly</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{company.motto}</p>
              </div>

              <ul className="space-y-4">
                <li>
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-primary-foreground/85 transition-colors hover:text-gold"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl border border-gold/35 text-gold">
                      <WhatsappIconIcon height="1em" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-gold">
                        WhatsApp
                      </span>
                      {company.whatsapp}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={company.phoneHref}
                    className="flex items-center gap-3 text-sm text-primary-foreground/85 transition-colors hover:text-gold"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl border border-gold/35 text-gold">
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-gold">
                        Call us
                      </span>
                      {company.phone}
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-foreground/85">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-gold/35 text-gold">
                    <MapPin className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-gold">
                      Location
                    </span>
                    {company.location}
                  </span>
                </li>
                <li>
                  <a
                    href={company.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-primary-foreground/85 transition-colors hover:text-gold"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl border border-gold/35 text-gold">
                      <Globe className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-gold">
                        Website
                      </span>
                      {company.website}
                    </span>
                  </a>
                </li>
              </ul>

              <div className="hairline" />

              <div className="flex flex-wrap gap-2">
                {company.socials.map((social) => {
                  const Icon = socialIcons[social.label as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={`${company.name} on ${social.label}`}
                      title={social.label}
                      className="flex size-10 items-center justify-center rounded-full border border-gold/35 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto overflow-hidden rounded-2xl border border-gold/25">
                <iframe
                  title={`Map of ${company.location}`}
                  src={company.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-52 w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
