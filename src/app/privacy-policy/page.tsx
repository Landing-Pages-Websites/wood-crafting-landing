import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Wood Crafting LLC",
  description: "Privacy practices for Wood Crafting LLC, including its SMS/text messaging program.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-5 py-12 text-[var(--color-text)] md:py-20">
      <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-card-lg md:p-12">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">Effective date: August 14, 2026</p>

        <div className="mt-10 space-y-9 text-[15px] leading-7 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-3 text-2xl">Information we collect</h2>
            <p>Wood Crafting LLC may collect information you provide, including your name, email address, optional phone number, company, project specifications, product interests, delivery information, and communications. We may also collect device, browser, usage, referral, and cookie information when you use our website.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">How we use information</h2>
            <p>We use information to respond to inquiries, prepare quotes, coordinate products and services, communicate about projects and orders, operate and improve our website, prevent fraud, comply with law, and send communications you have requested or authorized.</p>
          </section>
          <section className="rounded-xl bg-[var(--color-surface-2)] p-5 md:p-7">
            <h2 className="mb-3 text-2xl">SMS/Text Messaging</h2>
            <div className="space-y-3">
              <p>If you provide a mobile number and affirmatively select the optional SMS consent checkbox, Wood Crafting LLC may send customer-care text messages about your project inquiry, quote, order, appointments, reminders, requested information, and service updates.</p>
              <p>Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out at any time or HELP for assistance. We may send one final message confirming an opt-out request.</p>
              <p>We will not sell, rent, or share your mobile phone number, SMS opt-in data, or consent status with third parties or affiliates for their own marketing or promotional purposes. All other data-sharing categories described in this policy exclude text-messaging originator opt-in data and consent.</p>
              <p>We may share SMS-related data with telecommunications carriers, messaging platforms, and service providers solely as necessary to operate and deliver the messaging program or as required by law.</p>
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">How we disclose information</h2>
            <p>We may disclose information to service providers that support hosting, analytics, communications, fulfillment, delivery, payment processing, security, and customer service; to professional advisers; when required by law; or in connection with a business transaction. Service providers may use information only to perform services on our behalf.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">Security, retention, and choices</h2>
            <p>We use reasonable safeguards designed to protect personal information and retain it as needed for the purposes described above, legal compliance, dispute resolution, and recordkeeping. Depending on applicable law, you may request access, correction, or deletion by contacting us through our main website.</p>
          </section>
          <section>
            <h2 className="mb-3 text-2xl">Contact and updates</h2>
            <p>We may update this policy by posting a revised version with a new effective date. Questions may be submitted through <a href="https://www.woodcraftingllc.com/contact-us" className="font-semibold text-[var(--color-primary)] underline">Wood Crafting&apos;s contact page</a>.</p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6 text-sm">
          <Link href="/" className="font-semibold text-[var(--color-primary)] underline">Return to booking page</Link>
          <Link href="/terms-of-service" className="font-semibold text-[var(--color-primary)] underline">Terms of Service</Link>
        </div>
      </article>
    </main>
  );
}
