import Image from "next/image";
import {
  CalendarCheck,
  Scissors,
  Users,
  Gem,
  Flower2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { salon } from "@/data/salon";

const features = [
  { icon: Users, label: "Expert Stylists" },
  { icon: Gem, label: "Premium Brands" },
  { icon: Flower2, label: "Relaxing Ambience" },
  { icon: ShieldCheck, label: "Hygienic & Safe" },
];

const serviceWords = ["Hair", "Beauty", "Skincare", "Bridal", "Grooming"];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.webp"
        alt="Hair styling at Quality Beauty Salon in Raipur"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlays for legible text */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />

      {/* Vertical service list (desktop) */}
      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {serviceWords.map((w) => (
          <span
            key={w}
            className="text-sm font-medium uppercase tracking-[0.35em] text-cream/40"
          >
            {w}
          </span>
        ))}
        <span className="mt-1 h-px w-10 bg-gold/60" />
      </div>

      <div className="container-x relative z-10 py-24 md:py-28">
        <div className="max-w-2xl">
          <p className="kicker text-gold-soft [&::before]:bg-gold-soft">
            {salon.name}
          </p>

          <h1 className="mt-5 font-display text-[2.75rem] font-semibold leading-[1.02] text-cream sm:text-6xl md:text-7xl">
            Look Good.
            <br />
            Feel <span className="text-gold-gradient">Amazing.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">
            Professional hair styling, colour, grooming, skincare and bridal
            makeup in {salon.address.line2}, {salon.city}. Premium brands,
            expert stylists, one welcoming space for men &amp; women.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:bg-gold-soft hover:text-ink"
            >
              <CalendarCheck className="h-4 w-4" />
              Book an Appointment
            </a>
            <a
              href="#services"
              className="flex items-center gap-2 rounded-full border border-cream/40 bg-cream/5 px-7 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-all hover:bg-cream/15"
            >
              <Scissors className="h-4 w-4" />
              Explore Services
            </a>
          </div>

          {/* Feature badges */}
          <div className="mt-10 grid max-w-lg grid-cols-4 gap-2 sm:gap-4">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-soft">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="mt-2 text-[0.7rem] font-medium leading-tight text-cream/80">
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-8 h-px w-16 bg-gold/60" />

          {/* Trust indicators (verified facts only) */}
          <div className="mt-6 flex flex-wrap items-center divide-x divide-cream/15">
            {salon.trust.map((t) => (
              <div key={t.label} className="flex flex-col px-6 first:pl-0">
                <span className="flex items-center gap-1 font-display text-xl font-semibold text-cream">
                  {t.label === "On Instagram" && (
                    <Star className="h-4 w-4 fill-gold-soft text-gold-soft" />
                  )}
                  {t.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-cream/60">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
