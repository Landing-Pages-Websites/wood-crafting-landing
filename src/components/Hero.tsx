"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { HERO, PHONE, PHONE_HREF, BRAND } from "@/lib/content";

export function Hero(): React.ReactElement {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[var(--color-charcoal-deep)] pt-24 md:pt-32 pb-14 md:pb-24"
    >
      {/* Reclaimed-barn estate at dusk + charcoal scrim */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-reclaimed-barn.jpg"
          alt="Reclaimed-wood barn estate at dusk with warmly lit windows"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal-deep)]/95 via-[var(--color-charcoal-deep)]/88 to-[var(--color-charcoal-deep)]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-deep)] via-transparent to-[var(--color-charcoal-deep)]/60" />
        <div className="absolute inset-0 tex-grain opacity-40" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-14">
        {/* Copy */}
        <div className="order-1 lg:pt-6">
          <Reveal className="space-y-5 md:space-y-6">
            <ul className="flex flex-wrap gap-2">
              {HERO.chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                >
                  <Icon name="check" className="h-3.5 w-3.5 text-[var(--color-primary)]" strokeWidth={2.6} />
                  {chip}
                </li>
              ))}
            </ul>

            <h1 className="font-display font-extrabold leading-[1.04] tracking-[-0.025em] text-[2.05rem] sm:text-5xl lg:text-[3.4rem]">
              <span className="text-white">{HERO.h1Lead}</span>{" "}
              <span className="text-[var(--color-primary)]">{HERO.h1Accent}</span>
            </h1>

            <p className="hidden max-w-xl text-base leading-relaxed text-white/75 md:block md:text-lg">
              {HERO.subhead}
            </p>

            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2.5 rounded-md px-1 font-semibold text-white transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] md:inline-flex"
              aria-label={`Call ${BRAND.company} at ${PHONE}`}
            >
              <Icon name="phone" className="h-5 w-5 text-[var(--color-primary)]" strokeWidth={0} fill="currentColor" />
              <span>
                <span className="mr-1.5 text-sm font-normal text-white/60">Prefer to talk?</span>
                {PHONE}
              </span>
            </a>
          </Reveal>
        </div>

        {/* Form — above the fold on desktop and mobile */}
        <div className="order-2 lg:justify-self-end lg:w-full lg:max-w-md">
          <Reveal delay={120}>
            <FormCard idPrefix="hero" onDark />
          </Reveal>
        </div>

        {/* Phone — mobile only, below the form */}
        <a
          href={PHONE_HREF}
          className="order-3 inline-flex items-center justify-center gap-2.5 rounded-md font-semibold text-white md:hidden"
          aria-label={`Call ${BRAND.company} at ${PHONE}`}
        >
          <Icon name="phone" className="h-5 w-5 text-[var(--color-primary)]" strokeWidth={0} fill="currentColor" />
          <span>
            <span className="mr-1.5 text-sm font-normal text-white/60">Prefer to talk?</span>
            {PHONE}
          </span>
        </a>
      </div>
    </section>
  );
}
