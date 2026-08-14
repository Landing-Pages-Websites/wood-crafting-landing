"use client";

import { useEffect, useState } from "react";
import { CTA } from "@/lib/content";
import { Icon } from "@/components/icons";

// Mobile sticky action bar: primary quote CTA, always one tap away.
export function FloatingCTA(): React.ReactElement {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`sm:hidden fixed inset-x-0 bottom-0 z-50 flex border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md px-3 py-2.5 transition-all duration-300 [box-shadow:0_-6px_24px_-12px_rgba(28,26,24,0.4)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={CTA.heroFormAnchor}
        className="inline-flex flex-1 items-center justify-center gap-2 bg-[var(--color-primary)] text-white rounded-xl px-5 py-3 font-semibold text-sm shadow-cta"
      >
        {CTA.primary}
        <Icon name="arrow" className="w-4 h-4" strokeWidth={2.4} />
      </a>
    </div>
  );
}
