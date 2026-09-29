/**
 * SINGLE SOURCE OF TRUTH for editable content.
 * Change prices, phone numbers, services, stats, FAQs and testimonials here.
 */

export const company = {
  name: "Nature's Best Cleaning Company",
  shortName: "Nature's Best",
  tagline: "We don't just clean. We make your space exhale.",
  subline: "Luxury cleaning, thoughtfully done.",
  motto: "Clean spaces. Happy places. Better living.",
  location: "Al Muntaza, Doha, Qatar",
  website: "Naturesbestcompany.com",
  websiteUrl: "https://naturesbestcompany.com",
  phone: "+974 3305 0358",
  phoneHref: "tel:+97433050358",
  whatsapp: "+974 5079 3043",
  whatsappUrl:
    "https://wa.me/97450793043?text=Hello%20Nature's%20Best%20Cleaning%2C%20I'd%20like%20to%20get%20a%20quote.",
  workingHours: "Saturday – Thursday, 7:00 AM – 9:00 PM (Friday by appointment)",
  mapEmbed:
    "https://www.google.com/maps?q=Al%20Muntazah%2C%20Doha%2C%20Qatar&output=embed",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const trustChips = [
  "Trained & Uniformed Team",
  "Professional Equipment",
  "Eco-Conscious Products",
  "Satisfaction Guaranteed",
] as const;

export const stats = [
  { label: "Happy Clients", value: 480, suffix: "+" },
  { label: "Spaces Cleaned", value: 1250, suffix: "+" },
  { label: "Years of Service", value: 6, suffix: "" },
  { label: "Star Rating", value: 5, suffix: ".0" },
] as const;

export const services = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    icon: "home",
    description:
      "Regular upkeep for apartments and villas — dusting, floors, kitchen and bathrooms left calm and fresh.",
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    icon: "sparkles",
    description:
      "Steam-led detail work: grout, inside cabinets, appliances, upholstery and every forgotten corner.",
  },
  {
    id: "move-in-out",
    name: "Move-In / Move-Out",
    icon: "truck",
    description:
      "Handover-ready results. We reset the whole property so you collect your deposit with confidence.",
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    icon: "building",
    description:
      "Scheduled commercial care for offices, clinics and retail — discreet, uniformed and on time.",
  },
] as const;

export const serviceOptions = [
  "Home Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out",
  "Office Cleaning",
  "Other",
] as const;

export const propertyTypes = ["Apartment", "Villa", "Office", "Other"] as const;

export const benefits = [
  {
    icon: "wrench",
    title: "Professional-Grade Equipment",
    text: "Kärcher steam cleaners, wet & dry vacuums, carpet and upholstery extractors.",
  },
  {
    icon: "shield",
    title: "Trained & Vetted Staff",
    text: "Uniformed, background-checked cleaners trained to a written standard.",
  },
  {
    icon: "leaf",
    title: "Safe, Eco-Conscious Products",
    text: "Gentle on children, pets and surfaces — tough on grime and odour.",
  },
  {
    icon: "calendar",
    title: "Flexible Scheduling",
    text: "Mornings, evenings and same-day slots across Doha when available.",
  },
  {
    icon: "receipt",
    title: "Transparent Pricing",
    text: "Clear quotes before we start. No surprise charges, ever.",
  },
  {
    icon: "badge",
    title: "Satisfaction Guarantee",
    text: "Not delighted? Tell us within 24 hours and we return to make it right.",
  },
] as const;

export const plans = [
  {
    id: "essential",
    name: "Essential Clean",
    oneTime: "150",
    monthly: "520",
    unit: "QAR",
    blurb: "Standard home cleaning to keep things calm week to week.",
    features: [
      "Living areas, bedrooms & floors",
      "Kitchen surfaces & sink",
      "Bathroom clean & sanitise",
      "Dusting and bin change",
    ],
    popular: false,
  },
  {
    id: "deep",
    name: "Deep Clean",
    oneTime: "350",
    monthly: "1,150",
    unit: "QAR",
    blurb: "The full reset — detailed scrub with steam and extraction.",
    features: [
      "Everything in Essential",
      "Kitchen degrease & inside cabinets",
      "Bathroom grout & limescale",
      "Steam clean & upholstery care",
      "Interior windows & skirting",
    ],
    popular: true,
  },
  {
    id: "move",
    name: "Move-In / Move-Out",
    oneTime: "500",
    monthly: "—",
    unit: "QAR",
    blurb: "Handover-ready property cleaning, top to bottom.",
    features: [
      "Full empty-property deep clean",
      "Inside all cupboards & wardrobes",
      "Balcony, windows & fittings",
      "Landlord handover checklist",
    ],
    popular: false,
  },
  {
    id: "office",
    name: "Office & Commercial",
    oneTime: "Custom",
    monthly: "Custom",
    unit: "",
    blurb: "Tailored contracts for offices, clinics and retail spaces.",
    features: [
      "Daily, weekly or monthly visits",
      "Out-of-hours scheduling",
      "Washroom & pantry care",
      "Dedicated account contact",
    ],
    popular: false,
  },
] as const;

export const pricingNote =
  "Final price depends on property size and condition. Get an exact quote in minutes.";

export const steps = [
  {
    title: "Request a Quote",
    text: "Send your details by form or WhatsApp. We reply fast with a clear price.",
  },
  {
    title: "We Confirm & Schedule",
    text: "Pick a slot that suits you. You get a confirmation and an arrival window.",
  },
  {
    title: "We Clean",
    text: "A uniformed team arrives with professional equipment and eco-conscious products.",
  },
  {
    title: "You Exhale",
    text: "Walk into a space that feels lighter. Not happy? We come back.",
  },
] as const;

export const testimonials = [
  {
    name: "Aisha M.",
    role: "Villa owner, Al Waab",
    quote:
      "They arrived on time, in uniform, with equipment I didn't even know existed. My kitchen looks brand new.",
    rating: 5,
  },
  {
    name: "Rashid K.",
    role: "Tenant, The Pearl",
    quote:
      "Booked a move-out clean and got my full deposit back. The landlord actually commented on it.",
    rating: 5,
  },
  {
    name: "Laura B.",
    role: "Office manager, West Bay",
    quote:
      "We switched our office contract to Nature's Best and the difference is obvious every morning.",
    rating: 5,
  },
  {
    name: "Mohammed A.",
    role: "Apartment, Al Sadd",
    quote:
      "Polite, thorough and genuinely careful with our things. The products are safe around our kids.",
    rating: 5,
  },
  {
    name: "Grace O.",
    role: "Villa, Al Muntaza",
    quote:
      "The deep clean was worth every riyal. The house smelled fresh for weeks afterwards.",
    rating: 5,
  },
] as const;

export const faqs = [
  {
    q: "What's included in a standard clean?",
    a: "Dusting, floors, bedrooms, living areas, kitchen surfaces and a full bathroom clean and sanitise. Deep cleaning adds steam work, inside cabinets, grout, appliances and upholstery.",
  },
  {
    q: "Do you bring your own equipment and supplies?",
    a: "Yes. Our teams arrive with professional-grade steam cleaners, wet and dry vacuums, carpet and upholstery extractors, and all cleaning products — nothing needed from you.",
  },
  {
    q: "How much notice do you need for a booking?",
    a: "24 hours is ideal, and same-day slots are often available. Message us on WhatsApp and we'll tell you what's open today.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel or reschedule free of charge up to 12 hours before your slot. Later than that we ask for a small call-out fee to cover the team's time.",
  },
  {
    q: "Which areas do you cover?",
    a: "All of Doha and surrounding areas, including Al Muntaza, Al Sadd, Al Waab, West Bay, The Pearl, Lusail and Ain Khaled.",
  },
  {
    q: "How can I pay?",
    a: "Cash, bank transfer and major cards on completion. Office and commercial contracts can be invoiced monthly.",
  },
  {
    q: "Are your products safe for pets and children?",
    a: "Yes. We use eco-conscious, low-odour products that are safe around children and pets, and we can go fragrance-free on request.",
  },
  {
    q: "What if I'm not happy with the clean?",
    a: "Tell us within 24 hours and we return to put it right at no extra cost. That's our satisfaction guarantee.",
  },
] as const;
