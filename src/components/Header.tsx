"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CTA, PHONE, PHONE_HREF, BRAND } from "@/lib/content";
import { Icon } from "@/components/icons";

export function Header(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_1px_16px_-8px_rgba(28,26,24,0.35)]"
          : "bg-[var(--color-bg)]/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between py-2.5 md:py-3">
        <a
          href={CTA.heroFormAnchor}
          className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label={`${BRAND.company} — home`}
        >
          <Image
            src="/logo.png"
            alt={BRAND.company}
            width={900}
            height={420}
            priority
            className="h-9 md:h-11 w-auto object-contain"
          />
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden sm:inline-flex items-center gap-2 border-[1.5px] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors rounded-xl px-4 py-2 md:py-2.5 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label={`Call ${BRAND.company} at ${PHONE}`}
          >
            <Icon name="phone" className="w-4 h-4 text-[var(--color-primary)]" strokeWidth={0} fill="currentColor" />
            <span>{PHONE}</span>
          </a>
          <a
            href={CTA.heroFormAnchor}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors rounded-xl px-4 md:px-5 py-2 md:py-2.5 font-semibold text-sm shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            {CTA.primary}
            <Icon name="arrow" className="w-3.5 h-3.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
