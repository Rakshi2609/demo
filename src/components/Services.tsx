"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { services, serviceCategories, type Service } from "@/data/salon";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Services() {
  const [active, setActive] = useState<(typeof serviceCategories)[number]>("All");

  const filtered =
    active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="What we do"
          title="Services crafted for you"
          subtitle="From everyday haircuts to bridal makeup — hair, skin and grooming for men and women, all under one roof."
        />

        {/* Category tabs */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-ink text-cream"
                  : "bg-cream-2 text-ink-soft hover:bg-line"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {service.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cream">
            Popular
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink">{service.name}</h3>
          <span className="whitespace-nowrap text-sm font-semibold text-gold">
            {service.price}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {service.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {service.duration}
          </span>
          <a
            href="#booking"
            className="flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-gold"
          >
            Book <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
