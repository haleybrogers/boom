type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = dark ? "text-cream" : "text-charcoal";
  const subtextColor = dark ? "text-cream/70" : "text-brown";

  return (
    <div className={`max-w-2xl ${alignment} mb-12 lg:mb-16`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase ${subtextColor} mb-3`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] ${textColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed ${subtextColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
