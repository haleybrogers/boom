"use client";

import { useState } from "react";
import ClassAccordions from "./ClassAccordions";
import PricingComparison from "./PricingComparison";

const tabs = [
  { id: "classes", label: "Classes" },
  { id: "pricing", label: "Pricing" },
] as const;

export default function ClassesTabs() {
  const [active, setActive] = useState<"classes" | "pricing">("classes");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex justify-center gap-1 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-colors ${
              active === tab.id
                ? "bg-charcoal text-white"
                : "bg-transparent text-charcoal/50 hover:text-charcoal"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "classes" && (
        <div className="max-w-3xl mx-auto">
          <ClassAccordions />
        </div>
      )}

      {active === "pricing" && (
        <PricingComparison />
      )}
    </div>
  );
}
