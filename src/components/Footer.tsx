import { Instagram, Phone, MapPin, MessageCircle } from "lucide-react";
import { salon, navLinks } from "@/data/salon";
import {
  fullAddress,
  telLink,
  prettyPhone,
  whatsappLink,
  bookingWhatsappMessage,
} from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="container-x grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 font-display text-xl font-bold text-gold-soft">
              Q
            </span>
            <span className="font-display text-lg font-semibold text-cream">
              {salon.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/60">
            {salon.shortPitch}
          </p>
          <a
            href={salon.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-gold hover:text-ink"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-lg font-semibold text-cream">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/60 transition hover:text-gold-soft">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-2">
          <h4 className="font-display text-lg font-semibold text-cream">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <span className="text-cream/70">{fullAddress()}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-gold" />
              <a href={telLink()} className="text-cream/70 hover:text-gold-soft">
                {prettyPhone(salon.phonePrimary)}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="h-5 w-5 shrink-0 text-gold" />
              <a
                href={whatsappLink(bookingWhatsappMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold-soft"
              >
                Book on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {salon.legalName}. All rights reserved.
          </p>
          <p>Unisex Salon &amp; Academy · {salon.city}, Chhattisgarh</p>
        </div>
      </div>
    </footer>
  );
}
