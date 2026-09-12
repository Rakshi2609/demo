import { MapPin, Phone, Clock, Instagram, MessageCircle, Navigation } from "lucide-react";
import { salon } from "@/data/salon";
import {
  fullAddress,
  telLink,
  prettyPhone,
  whatsappLink,
  bookingWhatsappMessage,
  mapsLink,
  directionsLink,
} from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Contact() {
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    salon.mapsQuery
  )}&output=embed`;

  return (
    <section id="contact" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Visit us"
          title="Find us in Raipur"
          subtitle="Drop by, call, or message us on WhatsApp — we'd love to welcome you."
        />

        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-line shadow-xl shadow-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Info panel (dark, premium) */}
            <div className="flex flex-col gap-7 bg-ink p-8 text-cream md:p-10">
              <InfoRow icon={<MapPin className="h-5 w-5" />} title="Address">
                <p className="text-cream/80">{fullAddress()}</p>
                <p className="mt-1 text-sm font-medium text-gold-soft">
                  {salon.branchNote}
                </p>
              </InfoRow>

              <InfoRow icon={<Phone className="h-5 w-5" />} title="Phone">
                <a href={telLink()} className="text-cream/80 hover:text-gold-soft">
                  {prettyPhone(salon.phonePrimary)}
                </a>
                <span className="mx-2 text-cream/30">·</span>
                <a
                  href={telLink(salon.phoneSecondary)}
                  className="text-cream/80 hover:text-gold-soft"
                >
                  {prettyPhone(salon.phoneSecondary)}
                </a>
              </InfoRow>

              <InfoRow icon={<Clock className="h-5 w-5" />} title="Opening hours">
                <ul className="mt-1 space-y-1 text-sm">
                  {salon.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span className="text-cream/50">{h.day}</span>
                      <span className="font-medium text-cream/90">
                        {h.open} – {h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <InfoRow icon={<Instagram className="h-5 w-5" />} title="Instagram">
                <a
                  href={salon.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-gold-soft"
                >
                  {salon.instagramHandle}
                </a>
              </InfoRow>

              {/* Action buttons */}
              <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={directionsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-cream transition hover:bg-gold-soft hover:text-ink"
                >
                  <Navigation className="h-4 w-4" /> Directions
                </a>
                <a
                  href={telLink()}
                  className="flex items-center justify-center gap-2 rounded-full border border-cream/25 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <a
                  href={whatsappLink(bookingWhatsappMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1eb457]"
                >
                  <MessageCircle className="h-4 w-4" fill="white" strokeWidth={0} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative min-h-[360px] lg:min-h-full">
              <iframe
                title={`Map to ${salon.legalName}`}
                src={mapEmbed}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink shadow-lg transition hover:bg-white"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-soft">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-cream">{title}</h3>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
