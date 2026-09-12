# Quality Beauty Salon & Academy — Website Demo

A polished, mobile-first marketing site for **Quality Beauty Salon & Academy**, a
premium unisex salon in Pandri, Raipur. Built with Next.js 15 (App Router),
React 19 and Tailwind CSS v4. No database required — bookings convert straight
to WhatsApp.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## Everything lives in one config file

All business content — name, phone, WhatsApp, address, hours, services, prices,
reviews, gallery, before/after — is in **`src/data/salon.ts`**. Change it there
and it updates across the whole site. Nothing business-specific is hardcoded in
components.

Comments in that file mark each value:

- `[VERIFIED]` — confirmed from the salon's public Instagram / web presence
- `[DEMO]` — placeholder for the demo; safe to replace
- `[CONFIRM]` — plausible, but confirm with the salon owner

### Common edits

| To change… | Edit |
| --- | --- |
| Phone / WhatsApp number | `salon.phonePrimary`, `salon.whatsapp` in `src/data/salon.ts` |
| Address / hours | `salon.address`, `salon.hours` |
| Services & prices | `services[]`, `pricing[]` |
| Turn on real prices (hides the "demo price" note) | set `PRICING_IS_VERIFIED = true` |
| Reviews | `reviews[]` |
| Photos | replace files in `public/images/` keeping the same names |

## About the images

The salon's Instagram media could not be downloaded (Instagram blocks anonymous
access), so **all photos in `public/images/` are demo placeholders** from
Unsplash (free for commercial use, no attribution). They are optimized WebP
(≈2.4 MB total). To use the salon's real photos, drop them into
`public/images/` with the same file names — no code changes needed.

## What's verified vs. demo

- **Verified:** name, unisex + academy, "since 2017", Pandri address, both phone
  numbers, Instagram handle & follower count, premium brands, new Surana branch.
- **Demo / to confirm:** prices, opening hours, testimonials, and all photos.
  No Google rating or fake statistics are shown anywhere.

## Sections

Header (sticky, mobile hamburger) · Hero · Services (filterable) · Before/After
(drag slider) · Gallery (lightbox) · Reviews · Pricing · About · Booking
(form → WhatsApp) · Instagram · Contact (map, directions, call) · Footer +
floating WhatsApp button.
