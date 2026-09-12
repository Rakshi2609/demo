import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { salon } from "@/data/salon";
import { fullAddress } from "@/lib/utils";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description = `${salon.legalName} — premium unisex hair, beauty, grooming & bridal makeup in ${salon.city}, trusted since ${salon.since}. Book your appointment on WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://qualitybeautysalon.example"),
  title: {
    default: `${salon.legalName} | Unisex Hair & Beauty Salon in ${salon.city}`,
    template: `%s | ${salon.name}`,
  },
  description,
  keywords: [
    "beauty salon Raipur",
    "unisex salon Raipur",
    "hair salon Pandri Raipur",
    "bridal makeup Raipur",
    "hair colour Raipur",
    "keratin smoothening Raipur",
    "men's grooming Raipur",
    salon.legalName,
  ],
  openGraph: {
    type: "website",
    title: `${salon.legalName} | Unisex Hair & Beauty Salon in ${salon.city}`,
    description,
    siteName: salon.legalName,
    locale: "en_IN",
    images: [{ url: "/images/hero.webp", width: 1600, height: 1000, alt: salon.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${salon.legalName} | ${salon.city}`,
    description,
    images: ["/images/hero.webp"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1b1512",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness / BeautySalon structured data — verified info only.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: salon.legalName,
  image: "https://qualitybeautysalon.example/images/hero.webp",
  description,
  telephone: salon.phonePrimary,
  foundingDate: String(salon.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${salon.address.line1}, ${salon.address.line2}`,
    addressLocality: salon.address.city,
    addressRegion: salon.address.state,
    postalCode: salon.address.pincode,
    addressCountry: "IN",
  },
  sameAs: [salon.instagram],
  priceRange: "₹₹",
  openingHours: "Mo-Su 10:00-20:30",
  areaServed: salon.city,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <FloatingWhatsApp />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
