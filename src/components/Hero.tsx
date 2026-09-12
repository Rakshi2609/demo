import Image from "next/image";
import { Scissors, Star } from "lucide-react";
import { salon } from "@/data/salon";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.webp"
        alt="Interior of Quality Beauty Salon in Raipur"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlays for legible text */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

      <div className="container-x relative z-10 py-28 md:py-32">
        <div className="max-w-2xl">
          <p className="kicker text-gold-soft [&::before]:bg-gold-soft">
            Unisex Salon &amp; Academy · Since {salon.since}
          </p>

          <h1 className="mt-5 font-display text-[2.75rem] font-semibold leading-[1.05] text-cream sm:text-6xl md:text-7xl">
            Your Style.
            <br />
            <span className="text-gold-gradient">Your Confidence.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            Professional hair styling, colour, grooming, skincare and bridal
            makeup in {salon.address.line2}, {salon.city}. Premium brands,
            expert stylists, one welcoming space for men &amp; women.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:bg-gold-soft hover:text-ink"
            >
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

          {/* Trust indicators (verified facts only) */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {salon.trust.map((t) => (
              <div key={t.label} className="flex flex-col">
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

          {/* Brand strip */}
          <div className="mt-9 border-t border-cream/15 pt-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/50">
              Premium brands we use
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {salon.brands.map((b) => (
                <span
                  key={b}
                  className="font-display text-lg font-medium text-cream/80"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
