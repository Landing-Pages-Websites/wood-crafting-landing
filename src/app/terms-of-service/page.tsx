import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Wood Crafting LLC",
  description: "Wood Crafting LLC material, order, website, and SMS/text messaging terms.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-5 py-12 text-[var(--color-text)] md:py-20">
      <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-card-lg md:p-12">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">Last updated: August 14, 2026</p>

        <div className="mt-10 space-y-9 text-[15px] leading-7 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-3 text-2xl">Reclaimed material disclosure</h2>
            <p>All materials are sold &quot;AS IS&quot; without implied or express warranties of merchantability. Reclaimed material will show historical imperfections, which may include nail holes, notching, checking, and color variations. Timbers may include a mix of rough-sawn and smooth surfaces with original patina unless otherwise noted. Hand-hewn timbers have a tolerance of approximately one inch for both height and width.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">Dimensions, processing, and quantities</h2>
            <p>Rafter stock may be S2E or SIS2E with original patina depending on the application and may vary by up to one-half inch in height and width. Timbers will be power washed and cleaned of visible metal. Specified lengths are minimum lengths to be supplied. The customary waste factor is 20–25% for domestic material and 35% for exotic material. The customer is responsible for length overages, which may increase the final price.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">Risk, claims, taxes, and possession</h2>
            <p>Wood Crafting LLC is not liable for the structural integrity of supplied material or for damage to milling tools. Customers should metal-detect material before milling. Material is not guaranteed to be insect-free. Shortage claims must be reported within 48 hours. The customer is responsible for applicable sales and use taxes and takes possession when material is loaded onto the truck, trailer, or other delivery vehicle.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">Storage, substitutions, and quotes</h2>
            <p>Proper storage and care after receipt are essential for successful installation and are the customer&apos;s responsibility. Not every listed size is always available. Wood Crafting LLC may substitute sizes when reasonably necessary. Unless otherwise stated, quoted prices are valid for 30 days from the estimate date.</p>
          </section>
          <section className="rounded-xl bg-[var(--color-surface-2)] p-5 md:p-7">
            <h2 className="mb-3 text-2xl">SMS/Text Messaging Terms</h2>
            <div className="space-y-3">
              <p><strong className="text-[var(--color-text)]">Program:</strong> Consumers who affirmatively opt in may receive customer-care texts from Wood Crafting LLC about project inquiries, quotes, orders, appointments, reminders, requested information, and service updates.</p>
              <p><strong className="text-[var(--color-text)]">Consent:</strong> SMS consent is optional and is not a condition of purchasing goods or services.</p>
              <p><strong className="text-[var(--color-text)]">Frequency and charges:</strong> Message frequency varies. Message and data rates may apply.</p>
              <p><strong className="text-[var(--color-text)]">Opt-out and help:</strong> Reply STOP to unsubscribe or HELP for assistance. After STOP, we may send one final confirmation message. No further program texts will be sent unless you opt in again.</p>
              <p><strong className="text-[var(--color-text)]">Delivery:</strong> Mobile carriers are not liable for delayed or undelivered messages. Delivery is subject to carrier availability and is not guaranteed.</p>
              <p><strong className="text-[var(--color-text)]">Privacy:</strong> Mobile numbers and SMS consent data will not be sold or shared with third parties or affiliates for their own marketing or promotional purposes. See our <Link href="/privacy-policy" className="font-semibold text-[var(--color-primary)] underline">Privacy Policy</Link>.</p>
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">Website use and changes</h2>
            <p>You may use this website only for lawful purposes. Product information, availability, pricing, and these Terms may be updated from time to time. Continued use after revised Terms are posted constitutes acceptance of the updated Terms to the extent permitted by law.</p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6 text-sm">
          <Link href="/" className="font-semibold text-[var(--color-primary)] underline">Return to booking page</Link>
          <Link href="/privacy-policy" className="font-semibold text-[var(--color-primary)] underline">Privacy Policy</Link>
        </div>
      </article>
    </main>
  );
}
