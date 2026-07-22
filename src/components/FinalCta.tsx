"use client";

import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { FINAL_CTA, PHONE, PHONE_HREF, BRAND } from "@/lib/content";

export function FinalCta(): React.ReactElement {
  return (
    <section
      id="quote"
      className="relative isolate overflow-hidden bg-[var(--color-primary)] py-20 text-white md:py-28"
    >
      <div className="absolute inset-0 -z-10 tex-grain opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
              Request a project quote
            </p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.12] text-white md:text-4xl lg:text-[2.9rem]">
              {FINAL_CTA.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">{FINAL_CTA.body}</p>

            <div className="mt-8">
              <p className="text-sm text-white/70">Prefer to talk first?</p>
              <a
                href={PHONE_HREF}
                className="mt-2 inline-flex items-center gap-3 font-display text-3xl font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md md:text-4xl"
                aria-label={`Call ${BRAND.company} at ${PHONE}`}
              >
                <Icon name="phone" className="h-7 w-7" strokeWidth={0} fill="currentColor" />
                {PHONE}
              </a>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/85">
                <Icon name="check" className="h-4 w-4" strokeWidth={2.6} />
                Every complete inquiry reaches our team directly.
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <FormCard
              idPrefix="quote"
              onDark
              heading="Scope your project"
              subheading="Tell us the product lines, rough quantities, and what you're building — we'll come back with real numbers."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
