"use client";

import { CTA, PHONE, PHONE_HREF, BRAND } from "@/lib/content";
import { Icon } from "@/components/icons";

interface DualCTAProps {
  align?: "start" | "center";
  primaryLabel?: string;
  primaryHref?: string;
  /** Use on dark charcoal / crimson bands — switches the phone link to light-on-dark. */
  onDark?: boolean;
}

export function DualCTA({
  align = "center",
  primaryLabel = CTA.primary,
  primaryHref = CTA.heroFormAnchor,
  onDark = false,
}: DualCTAProps): React.ReactElement {
  const justify = align === "start" ? "justify-start" : "justify-center";

  const primaryClasses = onDark
    ? "bg-white text-[var(--color-primary)] hover:bg-white/90"
    : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] shadow-cta";

  const phoneClasses = onDark
    ? "border-[1.5px] border-white/40 text-white hover:bg-white/10 hover:border-white"
    : "border-[1.5px] border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-surface-2)]";

  return (
    <div className={`flex flex-wrap items-center ${justify} gap-3 mt-8`}>
      <a
        href={primaryHref}
        className={`inline-flex items-center gap-2 ${primaryClasses} hover:-translate-y-0.5 active:translate-y-0 transition-all rounded-xl px-7 py-3.5 font-semibold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2`}
      >
        {primaryLabel}
        <Icon name="arrow" className="w-4 h-4" strokeWidth={2.4} />
      </a>
      <a
        href={PHONE_HREF}
        className={`inline-flex items-center gap-2 ${phoneClasses} transition-colors rounded-xl px-6 py-3.5 font-semibold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]`}
        aria-label={`Call ${BRAND.company} at ${PHONE}`}
      >
        <Icon name="phone" className="w-4 h-4" strokeWidth={0} fill="currentColor" />
        {CTA.secondary}
      </a>
    </div>
  );
}
