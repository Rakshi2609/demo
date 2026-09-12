import Image from "next/image";
import { Instagram } from "lucide-react";
import { salon, gallery } from "@/data/salon";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Curated strip of public/official-style imagery that links to the real
// profile. Intentionally NOT a fake live feed.
const strip = gallery.slice(0, 6);

export default function InstagramSection() {
  return (
    <section className="bg-cream-2 py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          kicker="Follow our latest work"
          title={salon.instagramHandle}
          subtitle={`${salon.instagramFollowers} followers on Instagram — see fresh transformations, offers and behind-the-scenes.`}
        />

        <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6 md:gap-3">
          {strip.map((img, i) => (
            <Reveal key={img.src} delay={(i % 6) * 50}>
              <a
                href={salon.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram — ${img.alt}`}
                className="group relative block aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-cream opacity-0 transition-all group-hover:bg-ink/40 group-hover:opacity-100">
                  <Instagram className="h-6 w-6" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href={salon.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <Instagram className="h-5 w-5" />
            Follow us on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
