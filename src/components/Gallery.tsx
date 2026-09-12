"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/data/salon";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    []
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % gallery.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  // Varied spans for a masonry feel
  const spans = [
    "sm:row-span-2",
    "",
    "",
    "sm:col-span-2",
    "sm:col-span-2",
    "",
    "",
    "sm:row-span-2",
  ];

  return (
    <section id="gallery" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Step inside"
          title="Our salon & our work"
          subtitle="A look at the space, the styling and the results. Tap any photo to view it larger."
        />

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 md:gap-4">
          {gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 4) * 60}
              className={`group relative overflow-hidden rounded-xl ${spans[i % spans.length]}`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open image: ${img.alt}`}
                className="h-full w-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div
            className="relative h-[75vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[open].src}
              alt={gallery[open].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-cream/80">
            {open + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
