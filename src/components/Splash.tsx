"use client";

import { useEffect, useState } from "react";
import { salon } from "@/data/salon";

/**
 * Branded landing/loading screen. Renders in the initial HTML so it covers the
 * page immediately, then fades out shortly after mount. Fully removed from the
 * DOM after the fade so it never blocks interaction.
 */
export default function Splash() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Lock scroll while the splash is up
    document.body.style.overflow = "hidden";
    const hide = setTimeout(() => setHidden(true), 1100);
    return () => clearTimeout(hide);
  }, []);

  useEffect(() => {
    if (!hidden) return;
    document.body.style.overflow = "";
    const remove = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(remove);
  }, [hidden]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Monogram */}
      <span className="splash-pop flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-cream/[0.06] font-display text-4xl font-bold text-gold-soft">
        Q
      </span>

      {/* Wordmark */}
      <h1 className="splash-fade mt-6 font-display text-3xl font-semibold text-cream sm:text-4xl">
        {salon.name}
      </h1>
      <p className="splash-fade mt-2 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-gold-soft">
        {salon.tagline}
      </p>

      {/* Loading bar */}
      <span className="mt-8 block h-px w-40 overflow-hidden bg-cream/15">
        <span className="splash-bar block h-full w-full origin-left bg-gold-soft" />
      </span>
    </div>
  );
}
