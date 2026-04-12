import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  target?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  target,
}: ButtonProps) {
  const base = "inline-block px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm tracking-wide transition-all duration-200 rounded-sm";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/85",
    outline: "border border-charcoal/20 text-charcoal hover:border-accent hover:text-accent",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (target || href.startsWith("http")) {
    return (
      <a href={href} className={classes} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
