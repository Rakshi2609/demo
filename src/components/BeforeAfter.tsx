"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { beforeAfter, type BeforeAfter as BA } from "@/data/salon";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function BeforeAfter() {
  return (
    <section className="bg-cream-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Real results"
          title="Before & after"
          subtitle="Drag the slider to see the transformation. Demo visuals — your salon's own before/after photos slot right in."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {beforeAfter.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <Slider item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Slider({ item }: { item: BA }) {
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Measure container width so the "before" image never squishes when clipped.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  return (
    <figure>
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-line shadow-sm"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        role="slider"
        aria-label={`Before and after: ${item.title}`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        {/* After (base layer) */}
        <Image
          src={item.after}
          alt={`${item.title} — after`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-cream backdrop-blur-sm">
          After
        </span>

        {/* Before (clipped to pos%; inner wrapper keeps full container width) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <div
            className="relative h-full"
            style={{ width: width ? `${width}px` : "100%" }}
          >
            <Image
              src={item.before}
              alt={`${item.title} — before`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <span className="absolute left-3 top-3 z-10 rounded-full bg-cream/80 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 flex items-center"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-full w-0.5 bg-cream/90" />
          <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-md">
            <MoveHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-ink">{item.title}</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gold">
          {item.category}
        </span>
      </figcaption>
    </figure>
  );
}
