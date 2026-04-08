export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Boomerang Pilates
        </p>
        <a
          href="mailto:hello@boomerangpilates.com"
          className="text-xs text-muted hover:text-accent transition-colors"
        >
          hello@boomerangpilates.com
        </a>
      </div>
    </footer>
  );
}
