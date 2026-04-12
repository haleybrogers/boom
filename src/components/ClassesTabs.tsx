"use client";

import { useState } from "react";
import ClassAccordions from "./ClassAccordions";
import PricingComparison from "./PricingComparison";
import FoundingPricing from "./FoundingPricing";

const tabs = [
  { id: "classes", label: "Classes" },
  { id: "pricing", label: "Pricing" },
  { id: "founding", label: "Founding Member" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ClassesTabs() {
  const [active, setActive] = useState<TabId>("classes");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex justify-center gap-1 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-5 py-2.5 text-[11px] tracking-widest uppercase transition-colors ${
              active === tab.id
                ? tab.id === "founding"
                  ? "bg-accent text-white"
                  : "bg-charcoal text-white"
                : tab.id === "founding"
                  ? "bg-transparent text-accent hover:text-accent/80 border border-accent/30"
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

      {active === "founding" && (
        <FoundingPricing />
      )}
    </div>
  );
}
