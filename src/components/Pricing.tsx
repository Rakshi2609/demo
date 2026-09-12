import { Info } from "lucide-react";
import { pricing, PRICING_IS_VERIFIED } from "@/data/salon";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-cream-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Transparent pricing"
          title="Our price menu"
          subtitle="Simple, easy to scan. Final price depends on hair length, condition and products chosen."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {pricing.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 80}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 md:p-7">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {group.title}
                </h3>
                <div className="mt-5 divide-y divide-line">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-ink-soft">
                        {item.name}
                        {item.note && (
                          <span className="ml-2 text-xs text-muted">({item.note})</span>
                        )}
                      </span>
                      {/* dotted leader */}
                      <span className="mx-2 hidden flex-1 translate-y-[-3px] border-b border-dotted border-line sm:block" />
                      <span className="whitespace-nowrap font-semibold text-gold">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {!PRICING_IS_VERIFIED && (
          <Reveal className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-center text-sm text-muted">
            <Info className="h-4 w-4 shrink-0 text-gold" />
            <span>
              Demo prices — please confirm current rates with the salon. Prices
              are easy to update in one place.
            </span>
          </Reveal>
        )}

        <Reveal className="mt-8 text-center">
          <a
            href="#booking"
            className="inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-gold"
          >
            Book your appointment
          </a>
        </Reveal>
      </div>
    </section>
  );
}
