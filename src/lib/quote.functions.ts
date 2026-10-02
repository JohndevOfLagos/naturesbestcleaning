import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(6, "Please enter a valid phone or WhatsApp number").max(30),
  email: z.union([z.string().trim().email("Please enter a valid email"), z.literal("")]).optional(),
  service: z.string().trim().max(60).optional(),
  plan: z.string().trim().max(60).optional(),
  propertyType: z.string().trim().max(40).optional(),
  preferredDate: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1500).optional(),
  honeypot: z.string().max(0).optional(),
  source: z.string().trim().max(40).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const row = (label: string, value?: string) =>
  value && value.trim()
    ? `<tr><td style="padding:8px 14px;color:#6b7280;font-size:13px;white-space:nowrap">${esc(
        label,
      )}</td><td style="padding:8px 14px;color:#0B1F4B;font-size:15px;font-weight:600">${esc(
        value,
      )}</td></tr>`
    : "";

// Coarse in-memory throttle. Workers are stateless, so this only blunts bursts;
// the honeypot plus validation carries the rest.
const recent = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < 60_000);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 500) recent.clear();
  return hits.length > 4;
}

export const submitQuote = createServerFn({ method: "POST" })
  .validator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data, request }) => {
    if (data.honeypot) return { ok: true as const, emailSent: false };

    const ip =
      request?.headers.get("cf-connecting-ip") ??
      request?.headers.get("x-forwarded-for") ??
      "unknown";
    if (rateLimited(ip)) {
      throw new Error("Too many requests. Please try again in a minute.");
    }

    const companyEmail = process.env["COMPANY_EMAIL"];
    const resendKey = process.env["RESEND_API_KEY"];
    const resendFromEmail = process.env["RESEND_FROM_EMAIL"];

    let emailSent = false;
    let databaseSaved = false;
    if (companyEmail && resendKey && resendFromEmail) {
      const html = `
        <div style="background:#FBF7EE;padding:28px;font-family:Inter,Helvetica,Arial,sans-serif">
          <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #eadfc6">
            <div style="background:#0B1F4B;padding:22px 26px">
              <div style="color:#C9A24D;font-size:12px;letter-spacing:2px;text-transform:uppercase">New enquiry</div>
              <div style="color:#fff;font-size:21px;font-weight:700;margin-top:4px">Nature's Best Cleaning</div>
            </div>
            <table style="width:100%;border-collapse:collapse">
              ${row("Name", data.fullName)}
              ${row("Phone / WhatsApp", data.phone)}
              ${row("Email", data.email)}
              ${row("Service", data.service)}
              ${row("Plan", data.plan)}
              ${row("Property type", data.propertyType)}
              ${row("Preferred date", data.preferredDate)}
              ${row("Source", data.source ?? "Website")}
              ${row("Message", data.message)}
            </table>
            <div style="padding:16px 26px;background:#FBF7EE;color:#6b7280;font-size:12px">
              Sent from the Nature's Best Cleaning website.
            </div>
          </div>
        </div>`;

      const send = (payload: Record<string, unknown>) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

      try {
        const res = await send({
          from: resendFromEmail,
          to: [companyEmail],
          subject: `New cleaning enquiry — ${data.fullName}`,
          html,
          ...(data.email ? { reply_to: data.email } : {}),
        });
        emailSent = res.ok;
        if (!res.ok) console.error("Resend error", await res.text());

        if (res.ok && data.email) {
          await send({
            from: resendFromEmail,
            to: [data.email],
            subject: "Thank you — we've received your request",
            html: `<div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#0B1F4B;padding:24px">
              <h2 style="font-family:Georgia,serif">Thank you, ${esc(data.fullName)}.</h2>
              <p>We've received your request and will reach out shortly to confirm your quote and a time that suits you.</p>
              <p style="color:#6b7280;font-size:13px">Need us sooner? WhatsApp +974 5079 3043.</p>
              <p style="color:#C9A24D;font-style:italic">Clean spaces. Happy places. Better living.</p>
            </div>`,
          });
        }
      } catch (error) {
        console.error("Email send failed", error);
      }
    } else {
      console.warn("COMPANY_EMAIL or RESEND_API_KEY not configured — lead saved only.");
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("quote_requests").insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        service: data.service || null,
        plan: data.plan || null,
        property_type: data.propertyType || null,
        preferred_date: data.preferredDate || null,
        message: data.message || null,
        source: data.source || "website",
        email_sent: emailSent,
      });
      if (error) {
        console.error("Lead save failed", error);
      } else {
        databaseSaved = true;
      }
    } catch (error) {
      console.error("Lead save failed", error);
    }

    if (!emailSent || !databaseSaved) {
      throw new Error(
        "We couldn't complete your request right now. Please contact us on WhatsApp instead.",
      );
    }

    return { ok: true as const, emailSent, databaseSaved };
  });
