/**
 * ============================================================================
 *  QUALITY BEAUTY SALON & ACADEMY — CENTRAL SITE CONFIG
 * ============================================================================
 *  This is the SINGLE SOURCE OF TRUTH for the whole website. Change anything
 *  here and it updates everywhere. Nothing business-specific is hardcoded in
 *  components.
 *
 *  Legend used in comments:
 *    [VERIFIED]  – confirmed from the salon's public Instagram / web presence
 *    [DEMO]      – placeholder content for the demo; safe to replace
 *    [CONFIRM]   – plausible but must be confirmed with the salon owner
 *
 *  Research source: Instagram @qualitybeautysalonrpr (fetched), web search.
 *  Photos are DEMO placeholders (Unsplash, free commercial license). Replace
 *  the files in /public/images with real salon photos using the same names.
 * ============================================================================
 */

export const salon = {
  // ---- IDENTITY -----------------------------------------------------------
  name: "Quality Beauty Salon", // [VERIFIED] full name: "Quality Beauty Salon & Academy"
  legalName: "Quality Beauty Salon & Academy", // [VERIFIED]
  tagline: "Unisex Salon & Academy", // [VERIFIED]
  since: 2017, // [VERIFIED] "Since 2017"
  city: "Raipur", // [VERIFIED]
  shortPitch:
    "Premium unisex hair, beauty & grooming in Raipur — trusted since 2017.", // [VERIFIED facts]

  // ---- CONTACT ------------------------------------------------------------
  // Change the phone number in ONE place and it updates every call / WhatsApp
  // button, the booking flow and the structured data.
  phonePrimary: "+918435314844", // [VERIFIED] +91 84353 14844
  phoneSecondary: "+919589674356", // [VERIFIED] +91 95896 74356
  whatsapp: "918435314844", // [VERIFIED] digits only, country code first (no +)
  email: "", // [CONFIRM] none found publicly — leave blank to hide

  instagram: "https://www.instagram.com/qualitybeautysalonrpr/", // [VERIFIED]
  instagramHandle: "@qualitybeautysalonrpr", // [VERIFIED]
  instagramFollowers: "3,000+", // [VERIFIED] ~3,089 at time of research

  // Address [VERIFIED] – main branch
  address: {
    line1: "Shyam Square Complex, Near LIC Office",
    line2: "Pandri",
    city: "Raipur",
    state: "Chhattisgarh",
    pincode: "492004",
  },
  branchNote: "New branch at Surana Market, Raipur", // [VERIFIED] bio: "New Branch at Surana"

  // Google Maps [CONFIRM] – generic search link to the business + area.
  // Replace with the salon's exact Google Business "share" / place link.
  mapsQuery:
    "Quality Beauty Salon, Shyam Square Complex, Pandri, Raipur, Chhattisgarh 492004",

  // ---- OPENING HOURS ------------------------------------------------------
  // [CONFIRM] Typical local hours — confirm exact timings with the salon.
  hours: [
    { day: "Monday", open: "10:00 AM", close: "8:30 PM" },
    { day: "Tuesday", open: "10:00 AM", close: "8:30 PM" },
    { day: "Wednesday", open: "10:00 AM", close: "8:30 PM" },
    { day: "Thursday", open: "10:00 AM", close: "8:30 PM" },
    { day: "Friday", open: "10:00 AM", close: "8:30 PM" },
    { day: "Saturday", open: "10:00 AM", close: "9:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "8:30 PM" },
  ],

  // ---- BRANDS (used as a trust signal) -----------------------------------
  brands: ["L'Oréal", "Schwarzkopf", "Matrix", "Lotus", "Casmara"], // [VERIFIED] from bio

  // ---- TRUST INDICATORS (hero) — all verifiable, no invented numbers ------
  trust: [
    { label: "Trusted since", value: "2017" }, // [VERIFIED]
    { label: "Salon type", value: "Unisex" }, // [VERIFIED]
    { label: "On Instagram", value: "3,000+ followers" }, // [VERIFIED]
  ],
} as const;

// Whether pricing is confirmed with the salon. While false, the UI shows a
// "Demo price • confirm with salon" note. Flip to true once prices are real.
export const PRICING_IS_VERIFIED = false; // [DEMO]

// ---------------------------------------------------------------------------
//  SERVICES  — [VERIFIED] the categories/services below are all offered per
//  the salon's public description. [DEMO] prices & durations are placeholders.
// ---------------------------------------------------------------------------
export type Service = {
  id: string;
  name: string;
  category: "Hair" | "Men's Grooming" | "Skin & Beauty" | "Bridal & Makeup";
  description: string;
  price: string; // display string, e.g. "₹300" or "From ₹1,500"
  duration: string; // e.g. "45 min"
  image: string;
  popular?: boolean;
};

export const services: Service[] = [
  // --- Hair ---
  {
    id: "haircut",
    name: "Haircut & Blow-Dry",
    category: "Hair",
    description: "Precision cut and finish tailored to your face and hair type.",
    price: "From ₹300",
    duration: "45 min",
    image: "/images/svc-haircut.webp",
    popular: true,
  },
  {
    id: "color",
    name: "Hair Colour & Highlights",
    category: "Hair",
    description: "Global colour, roots, highlights & balayage with premium brands.",
    price: "From ₹1,500",
    duration: "90 min",
    image: "/images/svc-color.webp",
    popular: true,
  },
  {
    id: "spa",
    name: "Hair Spa & Treatment",
    category: "Hair",
    description: "Deep-conditioning spa to repair, nourish and add shine.",
    price: "From ₹800",
    duration: "60 min",
    image: "/images/svc-spa.webp",
    popular: true,
  },
  {
    id: "keratin",
    name: "Keratin / Smoothening",
    category: "Hair",
    description: "Frizz-free, smooth, glossy hair — keratin, smoothening & rebonding.",
    price: "From ₹3,500",
    duration: "150 min",
    image: "/images/svc-keratin.webp",
    popular: true,
  },
  {
    id: "styling",
    name: "Styling & Ironing",
    category: "Hair",
    description: "Blow-dry, curls, straightening and styling for any occasion.",
    price: "From ₹500",
    duration: "40 min",
    image: "/images/svc-styling.webp",
  },
  // --- Men's Grooming ---
  {
    id: "beard",
    name: "Beard Styling & Grooming",
    category: "Men's Grooming",
    description: "Sharp beard shaping, trims and clean grooming for men.",
    price: "From ₹150",
    duration: "30 min",
    image: "/images/svc-beard.webp",
    popular: true,
  },
  // --- Skin & Beauty ---
  {
    id: "facial",
    name: "Facial & Clean-Up",
    category: "Skin & Beauty",
    description: "Facials, clean-ups, D-tan & HydraFacial for fresh, glowing skin.",
    price: "From ₹700",
    duration: "60 min",
    image: "/images/svc-facial.webp",
  },
  // --- Bridal & Makeup ---
  {
    id: "bridal",
    name: "Bridal & Party Makeup",
    category: "Bridal & Makeup",
    description: "Bridal, party & festive makeup by experienced artists.",
    price: "On request",
    duration: "By appointment",
    image: "/images/svc-bridal.webp",
    popular: true,
  },
];

// Ordered category list for tabs / filters
export const serviceCategories = [
  "All",
  "Hair",
  "Men's Grooming",
  "Skin & Beauty",
  "Bridal & Makeup",
] as const;

// ---------------------------------------------------------------------------
//  PRICING MENU  — [DEMO] placeholder prices, grouped for quick scanning.
//  Prices show a "confirm with salon" note until PRICING_IS_VERIFIED = true.
// ---------------------------------------------------------------------------
export type PriceGroup = {
  title: string;
  items: { name: string; price: string; note?: string }[];
};

export const pricing: PriceGroup[] = [
  {
    title: "Hair — Women",
    items: [
      { name: "Haircut & Blow-Dry", price: "₹300 – ₹800" },
      { name: "Hair Wash & Conditioning", price: "₹200" },
      { name: "Hair Spa", price: "From ₹800" },
      { name: "Global Hair Colour", price: "From ₹1,500" },
      { name: "Highlights / Balayage", price: "From ₹2,500" },
      { name: "Keratin / Smoothening", price: "From ₹3,500" },
    ],
  },
  {
    title: "Hair & Grooming — Men",
    items: [
      { name: "Haircut", price: "From ₹150" },
      { name: "Beard Styling / Trim", price: "From ₹100" },
      { name: "Hair Colour (Men)", price: "From ₹500" },
      { name: "Hair Spa (Men)", price: "From ₹600" },
    ],
  },
  {
    title: "Skin & Beauty",
    items: [
      { name: "Clean-Up", price: "From ₹500" },
      { name: "Facial", price: "From ₹700" },
      { name: "D-Tan", price: "From ₹400" },
      { name: "HydraFacial", price: "From ₹2,000" },
    ],
  },
  {
    title: "Bridal & Makeup",
    items: [
      { name: "Party Makeup", price: "From ₹1,500" },
      { name: "Engagement Makeup", price: "On request" },
      { name: "Bridal Makeup", price: "On request", note: "Packages available" },
    ],
  },
];

// ---------------------------------------------------------------------------
//  BEFORE / AFTER  — [DEMO] conceptual transformation pairs. Replace with the
//  salon's own before/after photos (same file names) when available.
// ---------------------------------------------------------------------------
export type BeforeAfter = {
  id: string;
  category: string;
  title: string;
  before: string;
  after: string;
};

export const beforeAfter: BeforeAfter[] = [
  {
    id: "ba-color",
    category: "Hair Colour",
    title: "Global colour transformation",
    before: "/images/ba-1-before.webp",
    after: "/images/ba-1-after.webp",
  },
  {
    id: "ba-cut",
    category: "Haircut & Style",
    title: "Fresh cut & restyle",
    before: "/images/ba-2-before.webp",
    after: "/images/ba-2-after.webp",
  },
  {
    id: "ba-smooth",
    category: "Smoothening",
    title: "Frizz to sleek & glossy",
    before: "/images/ba-3-before.webp",
    after: "/images/ba-3-after.webp",
  },
];

// ---------------------------------------------------------------------------
//  GALLERY  — [DEMO] placeholder salon imagery. Replace with real photos.
// ---------------------------------------------------------------------------
export const gallery: { src: string; alt: string }[] = [
  { src: "/images/gallery-1.webp", alt: "Salon interior at Quality Beauty Salon" },
  { src: "/images/gallery-2.webp", alt: "Styling station" },
  { src: "/images/gallery-3.webp", alt: "Hair colouring work" },
  { src: "/images/gallery-4.webp", alt: "Professional hair styling" },
  { src: "/images/gallery-5.webp", alt: "Premium hair care products" },
  { src: "/images/gallery-6.webp", alt: "Blow-dry and finish" },
  { src: "/images/gallery-7.webp", alt: "Happy client with fresh hair" },
  { src: "/images/gallery-8.webp", alt: "Salon detail" },
];

// ---------------------------------------------------------------------------
//  REVIEWS  — [DEMO] sample testimonials, NOT real customer quotes. They are
//  written to be easily replaced with the salon's genuine Google reviews.
//  We intentionally do NOT attribute these to Google to avoid faking a source.
// ---------------------------------------------------------------------------
export type Review = {
  name: string;
  initial: string;
  rating: number;
  text: string;
  service: string;
};

export const reviews: Review[] = [
  {
    name: "Priya S.",
    initial: "P",
    rating: 5,
    text: "Loved my global colour — the team clearly knows their brands and the finish lasted really well. Clean, professional and friendly.",
    service: "Hair Colour",
  },
  {
    name: "Ankit R.",
    initial: "A",
    rating: 5,
    text: "Great haircut and beard styling for men. Quick, hygienic and exactly the look I asked for. My regular spot now.",
    service: "Men's Grooming",
  },
  {
    name: "Neha T.",
    initial: "N",
    rating: 5,
    text: "Got keratin done before a wedding and my hair looked so smooth and shiny. Staff explained everything and didn't rush.",
    service: "Keratin",
  },
  {
    name: "Ritu M.",
    initial: "R",
    rating: 5,
    text: "Relaxing hair spa and a lovely facial. The place is calm and well kept — you feel looked after the whole time.",
    service: "Hair Spa & Facial",
  },
];

// ---------------------------------------------------------------------------
//  ABOUT  — [VERIFIED] facts only.
// ---------------------------------------------------------------------------
export const about = {
  heading: "A trusted name in Raipur beauty since 2017",
  body: [
    "Quality Beauty Salon & Academy is a unisex salon in Pandri, Raipur, offering hair, skin, grooming and makeup services for both men and women — all under one roof.",
    "We work only with premium professional brands including L'Oréal, Schwarzkopf, Matrix, Lotus and Casmara, so you get salon results that look and feel professional.",
    "As a salon and academy, our team stays current with the latest techniques in cutting, colour, smoothening and skincare. We've recently opened a new branch at Surana Market to serve more clients across the city.",
  ],
  image: "/images/about.webp",
  highlights: [
    "Unisex — services for men & women",
    "Premium international brands",
    "Salon & professional academy",
    "Two locations in Raipur",
  ],
};

// Navigation links (single source for header + footer)
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
