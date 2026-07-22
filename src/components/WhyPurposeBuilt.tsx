"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { WHY, HOW_IT_WORKS } from "@/lib/content";

export function WhyWoodCrafting(): React.ReactElement {
  return (
    <section
      id="why"
      className="relative isolate overflow-hidden bg-[var(--color-charcoal)] py-20 text-white md:py-28"
    >
      <div className="absolute inset-0 -z-10 tex-grain opacity-30" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Why us */}
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-[var(--color-primary)]">Why Wood Crafting</p>
          <h2 className="mt-3 font-display text-[2rem] leading-[1.12] text-white md:text-4xl lg:text-[2.7rem]">
            {WHY.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{WHY.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {WHY.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                  <Icon name={pillar.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl text-white">{pillar.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{pillar.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Sourcing story */}
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-14 lg:items-center">
          {/* Alternating real photos */}
          <Reveal className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-2xl shadow-card-lg ring-1 ring-white/10">
                <Image
                  src="/images/estate-aerial.jpg"
                  alt="Aerial view of a reclaimed-wood clad estate and clubhouse"
                  fill
                  sizes="(min-width: 1024px) 28vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 mt-10 aspect-[3/4] overflow-hidden rounded-2xl shadow-card-lg ring-1 ring-white/10">
                <Image
                  src="/images/siding-gray.jpg"
                  alt="Reclaimed gray barn-board siding, weathered surface detail"
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-[var(--color-primary)]">From structure to site</p>
              <p className="mt-3 text-lg leading-relaxed text-white/80">{HOW_IT_WORKS.intro}</p>
            </Reveal>

            <ol className="mt-8 space-y-6">
              {HOW_IT_WORKS.steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 60}>
                  <li className="flex gap-4">
                    <span className="font-display text-lg font-bold leading-none text-[var(--color-primary)]">
                      {step.n}
                    </span>
                    <div className="border-l border-white/10 pl-4">
                      <h3 className="font-display text-lg text-white">{step.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{step.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                  Processing options
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {HOW_IT_WORKS.processing.map((opt) => (
                    <li
                      key={opt}
                      className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-white/85"
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={100}>
          <DualCTA align="center" onDark />
        </Reveal>
      </div>
    </section>
  );
}
