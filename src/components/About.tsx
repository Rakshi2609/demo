import Image from "next/image";
import { Check } from "lucide-react";
import { about, salon } from "@/data/salon";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-cream py-20 md:py-28">
      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-black/5">
            <Image
              src={about.image}
              alt="Inside Quality Beauty Salon"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Since badge */}
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-ink px-6 py-4 text-center shadow-xl sm:right-6">
            <span className="block font-display text-3xl font-bold text-gold-soft">
              {new Date().getFullYear() - salon.since}+
            </span>
            <span className="text-[0.65rem] uppercase tracking-widest text-cream/70">
              Years of trust
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="kicker">About the salon</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {about.heading}
            </h2>
          </Reveal>
          <div className="mt-5 space-y-4">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="text-[0.98rem] leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-ink-soft">{h}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
