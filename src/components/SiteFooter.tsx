import Image from "next/image";
import { BRAND, CURRENT_YEAR, NAP, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="bg-[var(--color-charcoal-deep)] text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="inline-flex rounded-xl bg-white p-3">
              <Image
                src="/logo.png"
                alt={BRAND.company}
                width={900}
                height={420}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-xs font-display text-lg font-semibold leading-snug text-white">
              {BRAND.tagline}
            </p>
            <p className="mt-2 text-sm text-white/55">{BRAND.region}</p>
          </div>

          {/* Contact / NAP */}
          <div className="md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              Visit &amp; contact
            </p>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed">
              <p className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span>
                  <span className="font-semibold text-white">{NAP.name}</span>
                  <br />
                  {NAP.street}, {NAP.city}, {NAP.state} {NAP.zip}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-[var(--color-primary)]" strokeWidth={0} fill="currentColor" />
                <a href={PHONE_HREF} className="transition-colors hover:text-white" aria-label={`Call ${BRAND.company} at ${PHONE}`}>
                  {PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a href={BRAND.emailHref} className="transition-colors hover:text-white">
                  {BRAND.email}
                </a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div className="md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Hours</p>
            <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
              <span>{NAP.hours}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} {BRAND.legalName}. All rights reserved.</p>
          <p className="text-white/45">100% reclaimed material · Locally salvaged</p>
        </div>
      </div>
    </footer>
  );
}
