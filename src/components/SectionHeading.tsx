import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {kicker && (
        <p
          className={`kicker justify-${align === "center" ? "center" : "start"} ${
            invert ? "text-gold-soft [&::before]:bg-gold-soft" : ""
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.75rem] ${
          invert ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${invert ? "text-cream/70" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
