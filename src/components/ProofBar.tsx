"use client";

import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { TRUST_STATS, BRAND } from "@/lib/content";

export function TrustBar(): React.ReactElement {
  return (
    <section
      id="trust"
      className="relative border-b border-[var(--color-border)] bg-[var(--color-surface-2)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
            {BRAND.tagline}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
            A professional sourcing partner for reclaimed wood — not a retail
            lumber yard, not a DIY marketplace.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 70}>
              <div className="flex h-full flex-col items-start bg-[var(--color-surface)] p-6 md:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Icon name={stat.icon} className="h-6 w-6" />
                </div>
                <p className="mt-4 font-display text-lg font-bold text-[var(--color-text)]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
