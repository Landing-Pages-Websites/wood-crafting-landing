"use client";

import { CTA } from "@/lib/content";
import { Icon } from "@/components/icons";

interface DualCTAProps {
  align?: "start" | "center";
  primaryLabel?: string;
  primaryHref?: string;
  /** Use on dark charcoal / crimson bands — switches the button to light-on-dark. */
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

  return (
    <div className={`flex flex-wrap items-center ${justify} gap-3 mt-8`}>
      <a
        href={primaryHref}
        className={`inline-flex items-center gap-2 ${primaryClasses} hover:-translate-y-0.5 active:translate-y-0 transition-all rounded-xl px-7 py-3.5 font-semibold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2`}
      >
        {primaryLabel}
        <Icon name="arrow" className="w-4 h-4" strokeWidth={2.4} />
      </a>
    </div>
  );
}
