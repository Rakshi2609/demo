import { Star, Quote, Instagram } from "lucide-react";
import { reviews, salon } from "@/data/salon";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-ink py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Kind words"
          title="Loved by clients across Raipur"
          subtitle="A few words from people who trust us with their hair and beauty."
          invert
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm">
                <Quote className="h-7 w-7 text-gold" />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-cream/85">
                  “{r.text}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-cream/10 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 font-display text-lg font-semibold text-gold-soft">
                    {r.initial}
                  </span>
                  <div className="flex-1">
                    <figcaption className="font-medium text-cream">{r.name}</figcaption>
                    <p className="text-xs text-cream/50">{r.service}</p>
                  </div>
                  <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold-soft text-gold-soft" />
                    ))}
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-cream/50">
            See more of our work and real client reactions on Instagram.
          </p>
          <a
            href={salon.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold-soft transition-all hover:bg-gold hover:text-ink"
          >
            <Instagram className="h-4 w-4" />
            {salon.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
