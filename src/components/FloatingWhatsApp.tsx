"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink, bookingWhatsappMessage } from "@/lib/utils";

/** Floating WhatsApp button — appears after a little scroll. */
export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(bookingWhatsappMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-[#1eb457] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <MessageCircle className="h-5 w-5" fill="white" strokeWidth={0} />
      <span className="hidden sm:inline">Book on WhatsApp</span>
    </a>
  );
}
