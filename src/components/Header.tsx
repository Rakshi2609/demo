"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { salon, navLinks } from "@/data/salon";
import { telLink, prettyPhone, cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream/90 shadow-sm shadow-black/5 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3" aria-label={salon.legalName}>
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full font-display text-xl font-bold transition-colors",
              scrolled ? "bg-ink text-gold-soft" : "bg-cream/15 text-gold-soft backdrop-blur-sm"
            )}
          >
            Q
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block font-display text-lg font-semibold transition-colors md:text-xl",
                scrolled ? "text-ink" : "text-cream"
              )}
            >
              {salon.name}
            </span>
            <span
              className={cn(
                "block text-[0.62rem] font-medium uppercase tracking-[0.2em] transition-colors",
                scrolled ? "text-muted" : "text-cream/70"
              )}
            >
              {salon.tagline}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold",
                scrolled ? "text-ink-soft" : "text-cream/90"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink()}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold",
              scrolled ? "text-ink-soft" : "text-cream/90"
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{prettyPhone()}</span>
          </a>
          <a
            href="#booking"
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              scrolled
                ? "bg-ink text-cream hover:bg-gold"
                : "bg-gold text-cream hover:bg-gold-soft hover:text-ink"
            )}
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#booking"
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
              scrolled || open ? "bg-ink text-cream" : "bg-gold text-cream"
            )}
          >
            Book
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              scrolled || open ? "text-ink" : "text-cream"
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-cream transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-3 text-base font-medium text-ink"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              Book Appointment
            </a>
            <a
              href={telLink()}
              className="flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink"
            >
              <Phone className="h-4 w-4" /> {prettyPhone()}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
