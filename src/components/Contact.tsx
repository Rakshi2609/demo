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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Info */}
          <Reveal className="space-y-6">
            <InfoRow icon={<MapPin className="h-5 w-5" />} title="Address">
              <p>{fullAddress()}</p>
              <p className="mt-1 text-sm text-gold">{salon.branchNote}</p>
            </InfoRow>

            <InfoRow icon={<Phone className="h-5 w-5" />} title="Phone">
              <a href={telLink()} className="hover:text-gold">
                {prettyPhone(salon.phonePrimary)}
              </a>
              <br />
              <a href={telLink(salon.phoneSecondary)} className="hover:text-gold">
                {prettyPhone(salon.phoneSecondary)}
              </a>
            </InfoRow>

            <InfoRow icon={<Clock className="h-5 w-5" />} title="Opening hours">
              <ul className="space-y-1 text-sm">
                {salon.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span className="text-muted">{h.day}</span>
                    <span className="font-medium text-ink">
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
                className="hover:text-gold"
              >
                {salon.instagramHandle}
              </a>
            </InfoRow>

            {/* Action buttons */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              <a
                href={directionsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-cream transition hover:bg-gold"
              >
                <Navigation className="h-4 w-4" /> Directions
              </a>
              <a
                href={telLink()}
                className="flex items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-3 text-sm font-semibold text-ink transition hover:border-gold hover:text-gold"
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
          </Reveal>

          {/* Map */}
          <Reveal delay={100}>
            <div className="h-full min-h-[340px] overflow-hidden rounded-2xl border border-line shadow-sm">
              <iframe
                title={`Map to ${salon.legalName}`}
                src={mapEmbed}
                className="h-full min-h-[340px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-gold hover:underline"
            >
              Open in Google Maps →
            </a>
          </Reveal>
        </div>
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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <div className="mt-1 text-ink-soft">{children}</div>
      </div>
    </div>
  );
}
