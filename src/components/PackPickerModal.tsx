"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ApparatusGroup, Membership } from "@/lib/momence";

// Triggered from /privates and /packs. Shows the apparatus pack matrix ,
// 3 rows (Private / Duet / Trio) × 3 columns (Single / 5-Pack / 10-Pack) ,
// pulled live from Momence. Each cell links straight to its Momence buy URL.
//
// Modeled after ContactFormModal / ClassGuideModal. Backdrop click,
// Esc to close, scroll lock on the body while open.

type Props = {
  buttonLabel: string;
  buttonClassName?: string;
  groups: ApparatusGroup[];
};

const SIZE_LABELS: Record<"single" | "five" | "ten", string> = {
  single: "Single Session",
  five: "5-Pack",
  ten: "10-Pack",
};

export default function PackPickerModal({
  buttonLabel,
  buttonClassName = "btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors",
  groups,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Don't render if nothing is available. Fall back to a disabled-style
  // button so the page doesn't look broken pre-launch.
  const hasAnyPack = groups.some((g) => g.single || g.five || g.ten);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!hasAnyPack}
        className={`${buttonClassName} ${
          !hasAnyPack ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {buttonLabel}
      </button>

      {mounted && open
        ? createPortal(<Modal groups={groups} close={() => setOpen(false)} />, document.body)
        : null}
    </>
  );
}

function Modal({
  groups,
  close,
}: {
  groups: ApparatusGroup[];
  close: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-sm w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
        <button
          onClick={close}
          className="absolute top-2 right-2 p-3 text-charcoal/40 hover:text-charcoal transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <p className="text-sm tracking-widest uppercase text-accent mb-3">
              By Appointment
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2">
              Pick your pack.
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto">
              Privates, duets &amp; trios. Single sessions or packs of 5 or 10.
              Packs expire 6 months after purchase.
            </p>
          </div>

          <div className="space-y-4">
            {groups.map((group) => {
              const cells: Array<["single" | "five" | "ten", Membership | undefined]> = [
                ["single", group.single],
                ["five", group.five],
                ["ten", group.ten],
              ];
              const hasAny = cells.some(([, m]) => m);
              if (!hasAny) return null;

              return (
                <div key={group.category}>
                  <div className="mb-2">
                    <h3 className="font-serif text-lg font-light text-charcoal">
                      {group.label}
                    </h3>
                    <p className="text-sm text-muted">{group.note}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {cells.map(([size, m]) => {
                      if (!m) {
                        return (
                          <div
                            key={size}
                            className="flex flex-col bg-white/50 border border-charcoal/5 rounded-sm p-4 opacity-60"
                          >
                            <p className="text-[11px] tracking-widest uppercase text-muted/60 mb-1">
                              {SIZE_LABELS[size]}
                            </p>
                            <p className="text-sm text-muted/70">Not available</p>
                          </div>
                        );
                      }
                      const perClassDivisor = size === "five" ? 5 : size === "ten" ? 10 : null;
                      const perClass =
                        perClassDivisor && m.price !== undefined
                          ? Math.ceil(m.price / perClassDivisor)
                          : null;
                      return (
                        <a
                          key={size}
                          href={m.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col bg-white border border-charcoal/10 rounded-sm p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40"
                        >
                          <p className="text-[11px] tracking-widest uppercase text-accent mb-1">
                            {SIZE_LABELS[size]}
                          </p>
                          <p className="font-serif text-xl font-light text-charcoal">
                            ${m.price}
                          </p>
                          {perClass !== null && (
                            <p className="text-[10px] text-accent/70 mb-2">
                              ~${perClass}/class
                            </p>
                          )}
                          <span className="mt-auto pt-2 text-[11px] tracking-widest uppercase text-accent/70 group-hover:text-accent transition-colors flex items-center justify-between">
                            <span>Buy</span>
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted/70 mt-7">
            Buy opens Momence in a new tab.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
