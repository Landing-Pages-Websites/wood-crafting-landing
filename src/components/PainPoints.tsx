"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { WHO_WE_SERVE } from "@/lib/content";

export function WhoWeServe(): React.ReactElement {
  return (
    <section id="who-we-serve" className="relative bg-[var(--color-bg)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro + feature image */}
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Who we serve</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[1.12] text-[var(--color-text)] md:text-4xl lg:text-[2.6rem]">
              Built to be your material partner.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              {WHO_WE_SERVE.intro}
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-card-lg ring-1 ring-[var(--color-border)]">
              <Image
                src="/images/barnboard-gray-2.jpg"
                alt="Weathered gray reclaimed barn board, surface detail"
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          {/* Segments */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card">
              {WHO_WE_SERVE.segments.map((segment, i) => (
                <Reveal key={segment.title} delay={i * 60}>
                  <li className="group flex items-start gap-4 p-6 transition-colors hover:bg-[var(--color-surface-2)] md:gap-5 md:p-7">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                      <Icon name={segment.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[var(--color-text)]">{segment.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {segment.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={80}>
              <DualCTA align="start" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
