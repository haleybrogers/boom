type CardProps = {
  title: string;
  description: string;
  icon?: string;
  className?: string;
};

export default function Card({
  title,
  description,
  icon,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white p-8 lg:p-10 border border-tan/30 hover:border-tan transition-colors duration-300 ${className}`}
    >
      {icon && <span className="text-3xl mb-4 block">{icon}</span>}
      <h3 className="font-serif text-2xl lg:text-3xl font-light text-charcoal mb-3">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-brown">{description}</p>
    </div>
  );
}
