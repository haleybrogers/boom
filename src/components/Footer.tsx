export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Boomerang Pilates
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@boomerangpilates.com"
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              hello@boomerangpilates.com
            </a>
            <a
              href="https://g.page/r/boomerangpilates/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Leave a Review
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
