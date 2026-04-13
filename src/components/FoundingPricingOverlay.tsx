"use client";

import FoundingCountdown from "./FoundingCountdown";

const MEMBERSHIP_URL = "https://app.arketa.co/boomerangpilates/memberships";

export default function FoundingPricingOverlay() {
  return (
    <div>
      {/* Hero — Become a Founding Member */}
      <div className="text-center mb-10">
        <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
          Founding Member · Ends June 15
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal mt-5 mb-3">
          Become a founding member.
        </h2>
        <p className="text-base text-muted max-w-lg mx-auto mb-6">
          Get in before we open the doors. Founding members shape this studio — and walk away with perks no one else can buy.
        </p>
        <FoundingCountdown showLabel={false} />
      </div>

      {/* What you get as a founding member — the headline experience */}
      <div className="max-w-2xl mx-auto bg-cream border border-accent/15 rounded-sm p-6 sm:p-8 mb-12">
        <p className="text-[10px] tracking-widest uppercase text-accent mb-4 text-center">
          What Every Founding Member Gets
        </p>
        <ul className="text-sm text-charcoal/85 space-y-3 max-w-md mx-auto">
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">✓</span>
            <span>
              <strong className="font-medium">Access to soft-opening classes</strong> — donation-based test classes before grand opening. Help us shake out the kinks.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">✓</span>
            <span>
              <strong className="font-medium">Opening Night invite</strong> — June 15, food &amp; drinks on us. Plus-one welcome.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">✓</span>
            <span>
              <strong className="font-medium">Welcome kit</strong> — handed out at opening night.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent shrink-0 mt-0.5">✓</span>
            <span>
              <strong className="font-medium">Founding pricing</strong> — choose your offer below. Lock it in before June 15.
            </span>
          </li>
        </ul>
      </div>

      {/* Founding offers — three equal options */}
      <div className="text-center mb-6">
        <p className="text-[10px] tracking-widest uppercase text-accent mb-2">Choose Your Founding Offer</p>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2">
          Pick one. That&apos;s how you&apos;re in.
        </h3>
        <p className="text-sm text-muted max-w-md mx-auto">
          Buy any of the three before opening day to lock in founding pricing and unlock every perk above.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Unlimited Mat */}
        <a
          href={MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col p-6 rounded-sm border-2 border-accent/30 bg-accent/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-accent">Membership</p>
            <span className="text-[9px] tracking-widest uppercase text-accent bg-accent/15 px-2 py-0.5 rounded-sm">
              Only 15 Spots Available
            </span>
          </div>
          <h4 className="font-serif text-lg font-light text-charcoal mb-1">Unlimited Mat</h4>
          <p className="text-xs text-muted mb-4">Unlimited mat classes per month</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-serif text-3xl font-light text-charcoal">$199</span>
            <span className="text-sm text-muted">/mo</span>
          </div>
          <p className="text-[11px] text-accent mb-4">Rate never increases*</p>
          <ul className="text-xs text-charcoal/70 space-y-1.5 mb-5 flex-1">
            <li>· No billing until June 15</li>
            <li>· 3-month minimum</li>
            <li>· Locked while membership stays active</li>
          </ul>
          <span className="text-[10px] tracking-widest uppercase text-accent text-center pt-3 border-t border-accent/15">
            Claim Spot →
          </span>
        </a>

        {/* 10-Pack Privates */}
        <a
          href={MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col p-6 rounded-sm border-2 border-accent/30 bg-accent/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-accent">Class Pack</p>
            <span className="text-[9px] tracking-widest uppercase text-accent bg-accent/15 px-2 py-0.5 rounded-sm">
              Save $200
            </span>
          </div>
          <h4 className="font-serif text-lg font-light text-charcoal mb-1">10-Pack Privates</h4>
          <p className="text-xs text-muted mb-4">Ten 1-on-1 sessions, full apparatus</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-serif text-3xl font-light text-charcoal">$900</span>
          </div>
          <p className="text-[11px] text-accent mb-4">$90/session</p>
          <ul className="text-xs text-charcoal/70 space-y-1.5 mb-5 flex-1">
            <li>· Billed at purchase</li>
            <li>· Use within 12 months</li>
            <li>· One-time founding discount</li>
          </ul>
          <span className="text-[10px] tracking-widest uppercase text-accent text-center pt-3 border-t border-accent/15">
            Buy Pack →
          </span>
        </a>

        {/* 10-Pack Duets */}
        <a
          href={MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col p-6 rounded-sm border-2 border-accent/30 bg-accent/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-accent">Class Pack</p>
            <span className="text-[9px] tracking-widest uppercase text-accent bg-accent/15 px-2 py-0.5 rounded-sm">
              Save $100
            </span>
          </div>
          <h4 className="font-serif text-lg font-light text-charcoal mb-1">10-Pack Duets</h4>
          <p className="text-xs text-muted mb-4">Ten duet sessions, bring a partner</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-serif text-3xl font-light text-charcoal">$500</span>
          </div>
          <p className="text-[11px] text-accent mb-4">$50/person</p>
          <ul className="text-xs text-charcoal/70 space-y-1.5 mb-5 flex-1">
            <li>· Billed at purchase</li>
            <li>· Use within 12 months</li>
            <li>· One-time founding discount</li>
          </ul>
          <span className="text-[10px] tracking-widest uppercase text-accent text-center pt-3 border-t border-accent/15">
            Buy Pack →
          </span>
        </a>
      </div>

      <p className="text-center text-[10px] text-muted/70 mt-6 max-w-xl mx-auto leading-relaxed">
        *Mat rate locked as long as membership stays active and continuous. If you cancel or pause, you lose the founding rate — rejoining later means standard pricing.
      </p>
    </div>
  );
}
