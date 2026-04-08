import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base = "inline-block px-7 py-3 text-sm tracking-wide transition-all duration-200";

  const variants = {
    primary: "bg-charcoal text-white hover:bg-charcoal/80",
    outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
