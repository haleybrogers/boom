import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 lg:py-40 min-h-[70vh]">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-accent mb-4">
          Error 404
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-light text-charcoal mb-5">
          This page did a teaser and never came back up.
        </h1>
        <p className="text-muted text-base leading-relaxed mb-10 max-w-md mx-auto">
          Even boomerangs miss sometimes. Let&apos;s roll up and try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/"
            className="btn-animated inline-block bg-charcoal text-white text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-charcoal/85 transition-colors"
          >
            Back to the Mat
          </Link>
          <Link
            href="/classes"
            className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
          >
            Or just book a class
          </Link>
        </div>

        <p className="text-xs text-muted/50 mt-16 italic">
          &ldquo;In 10 sessions you&apos;ll feel the difference, in 20 you&apos;ll see the difference,
          in 30 you&apos;ll have a whole new body.&rdquo; — Joseph Pilates
          <br />
          <span className="not-italic">(He never said anything about 404 pages.)</span>
        </p>
      </div>
    </section>
  );
}
