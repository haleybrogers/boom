import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-block px-8 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-200";

  const variants = {
    primary: "bg-charcoal text-cream hover:bg-brown",
    secondary: "bg-brown text-cream hover:bg-charcoal",
    outline:
      "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
