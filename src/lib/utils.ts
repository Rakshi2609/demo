import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { salon } from "@/data/salon";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** tel: link for the primary number. */
export function telLink(number: string = salon.phonePrimary) {
  return `tel:${number}`;
}

/** Build a WhatsApp click-to-chat link with an optional prefilled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${salon.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps search/directions link for the salon. */
export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    salon.mapsQuery
  )}`;
}

export function directionsLink() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    salon.mapsQuery
  )}`;
}

/** Human-readable full address. */
export function fullAddress() {
  const a = salon.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} ${a.pincode}`;
}

/** Pretty phone for display, e.g. +91 84353 14844 */
export function prettyPhone(raw: string = salon.phonePrimary) {
  const digits = raw.replace(/[^\d]/g, "");
  // +91 XXXXX XXXXX
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return raw;
}

/** Default WhatsApp booking message used across CTAs. */
export function bookingWhatsappMessage(fields?: {
  name?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
}) {
  if (!fields || !fields.name) {
    return `Hi ${salon.legalName}, I'd like to book an appointment. Could you please share available slots?`;
  }
  const lines = [
    `Hi ${salon.legalName}, I'd like to book an appointment.`,
    "",
    `Name: ${fields.name}`,
  ];
  if (fields.service) lines.push(`Service: ${fields.service}`);
  if (fields.date) lines.push(`Preferred Date: ${fields.date}`);
  if (fields.time) lines.push(`Preferred Time: ${fields.time}`);
  if (fields.message) lines.push(`Note: ${fields.message}`);
  return lines.join("\n");
}
