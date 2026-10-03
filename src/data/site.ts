/**
 * SINGLE SOURCE OF TRUTH for editable content.
 * Change prices, phone numbers, services, stats, FAQs and testimonials here.
 */

export const company = {
  name: "Nature's Best Cleaning Company",
  shortName: "Nature's Best",
  tagline: "We don't just clean. We make your space exhale.",
  subline: "Luxury cleaning, thoughtfully done.",
  clearMindLine: "A clean space. A clear mind. A better life.",
  motto: "Clean spaces. Happy places. Better living.",
  location: "Ibn Seena Street 960, Zone 24, Building 146, Floor 4, Office 5, Room 3, Doha, Qatar",
  website: "Naturesbestcompany.com",
  websiteUrl: "https://naturesbestcompany.com",
  phone: "+974 6692 3522",
  phoneHref: "tel:+97466923522",
  whatsapp: "+974 33050358",
  whatsappUrl: "https://wa.me/+97433050358",
  workingHours: "Saturday – Thursday, 7:00 AM – 9:00 PM (Friday by appointment)",
  mapEmbed:
    "https://www.google.com/maps?q=Ibn%20Seena%20Street%20960%2C%20Zone%2024%2C%20Building%20146%2C%20Floor%204%2C%20Office%205%2C%20Room%203%2C%20Doha%2C%20Qatar&output=embed",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/p/Natures-Best-Cleaning-Co-100063481721783/" },
    { label: "Instagram", href: "https://www.instagram.com/naturesbestcleaning/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCI1XBEBOgtTL4sMoB0inBtg/videos" },
    { label: "TikTok", href: "https://www.tiktok.com/@naturesbestcompany?_r=1&_t=ZS-9AEDxYA26MP" },
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
    service: "Home Cleaning",
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
    service: "Deep Cleaning",
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
    service: "Move-In / Move-Out",
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
    service: "Office Cleaning",
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
    quote: "The deep clean was worth every riyal. The house smelled fresh for weeks afterwards.",
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

export const chatContent = {
  welcome: "Hi! Welcome to Nature's Best Cleaning. How can I help you today?",
  quickReplies: [
    "Our Services",
    "Pricing",
    "Get a Quote",
    "Book a Cleaning",
    "Contact Us",
    "Talk to a Human",
  ],
  answers: {
    services:
      "We offer home cleaning, detailed deep cleans, move-in / move-out cleaning, and office cleaning across Doha. Tell me which service you need, or I can help you request a quote.",
    pricing:
      "Home cleaning starts from QAR 150, deep cleaning from QAR 350, and move-in / move-out cleaning from QAR 500. Office cleaning is quoted to fit your space. Share a few details for an exact quote.",
    areas:
      "We cover Doha and nearby areas, including Al Muntaza, Al Sadd, Al Waab, West Bay, The Pearl, Lusail and Ain Khaled. Send your area and we can confirm availability.",
    hours: `Our usual hours are ${company.workingHours}. Same-day visits depend on team availability. Tell me your preferred day and I can start a quote.`,
    booking:
      "24 hours' notice is ideal, and same-day appointments are often available. We confirm your slot and arrival window before the team heads over. Would you like to request a quote?",
    payment:
      "You can pay by cash, bank transfer or major cards after the clean. Commercial clients can be invoiced monthly. I can help you book whenever you're ready.",
    default:
      "I can help with services, pricing, Doha coverage, hours, booking or payment. You can also request a quote here, or talk to our team on WhatsApp.",
  },
  quotePrompts: {
    name: "Let's get a quote started. What's your full name?",
    phone: "Thanks. What's the best phone or WhatsApp number to reach you?",
    service:
      "Which service do you need: Home Cleaning, Deep Cleaning, Move-In / Move-Out, or Office Cleaning?",
    date: "And what date would you prefer? You can also say you're flexible.",
    success: "Thank you! Your quote request is with our team. We'll reach out shortly.",
    error: "I couldn't submit that just now. Please WhatsApp our team and we'll help you directly.",
  },
} as const;
