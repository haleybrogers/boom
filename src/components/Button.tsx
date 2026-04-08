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
  const base = "inline-block px-7 py-3 text-sm tracking-wide transition-all duration-200 rounded-sm";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/85",
    outline: "border border-charcoal/20 text-charcoal hover:border-accent hover:text-accent",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
