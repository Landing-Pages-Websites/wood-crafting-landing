"use client";

import { useRef, useState } from "react";
import {
  useMegaLeadForm,
  EMAIL_PATTERN,
  isValidEmail,
} from "@/hooks/useMegaLeadForm";
import { BRAND, PRODUCT_OPTIONS } from "@/lib/content";
import { Icon } from "@/components/icons";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    // Mega optimizer beacon. Optional so the type is safe when the tag is absent.
    MegaTag?: {
      trackEvent?: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

// ─── Validation (inline per-field, no native tooltips) ───

// Email uses the canonical fleet regex (isValidEmail) exported by the hook so
// the UI and the hook-level defense share one source of truth.

// NANP: area code & exchange each start 2-9 and may not be an N11.
const NANP_RE = /^[2-9](?!11)\d{2}[2-9](?!11)\d{2}\d{4}$/;

// Canonical formatted-phone pattern for the HTML5 <input pattern={...}> attr:
// matches the (XXX) XXX-XXXX shape produced by formatPhone().
const PHONE_PATTERN = "\\(\\d{3}\\) \\d{3}-\\d{4}";

// Submit-level failure copy. Retryable, and points to email as the fallback path.
const SUBMIT_ERROR_MESSAGE =
  `Something went wrong sending your request. Please try again, or email us at ${BRAND.email}.`;

// Form-specific submit label. Kept separate from CTA.primary so the header,
// floating, and section CTAs stay unchanged.
const FORM_SUBMIT_LABEL = "Get Project Pricing & Availability";

// DOM field keys are snake_case; the submitted payload is mapped to camelCase
// so there is never a duplicate (e.g. firstName + first_name) in form_data.
type FieldKey =
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "company"
  | "product_needed"
  | "project_needs";

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  product_needed: string;
  project_needs: string;
  sms_consent: boolean;
}

const INITIAL: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company: "",
  product_needed: "",
  project_needs: "",
  sms_consent: false,
};

type FieldErrors = Partial<Record<FieldKey, string>>;

// company + project_needs are required: they self-qualify professional buyers.
const REQUIRED_ORDER: FieldKey[] = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "company",
  "product_needed",
  "project_needs",
];

function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "first_name":
      return value.trim() ? undefined : "First name is required.";
    case "last_name":
      return value.trim() ? undefined : "Last name is required.";
    case "email": {
      const v = value.trim();
      if (!v) return "Email address is required.";
      if (!isValidEmail(v)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Phone number is required.";
      if (digits.length !== 10) return "Please enter a valid 10-digit phone number.";
      if (!NANP_RE.test(digits)) return "Please enter a valid US phone number.";
      return undefined;
    }
    case "company":
      return value.trim() ? undefined : "Company or organization is required.";
    case "product_needed":
      return value ? undefined : "Please select a product line.";
    case "project_needs":
      return value.trim()
        ? undefined
        : "Please describe your project needs and quantity.";
  }
}

function validateAll(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  REQUIRED_ORDER.forEach((k) => {
    const err = validateField(k, data[k]);
    if (err) errors[k] = err;
  });
  return errors;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

interface FormCardProps {
  idPrefix?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  routeSlug?: string;
  thankYouBody?: string;
  /** Render on a dark band: softens the outer ring for contrast. */
  onDark?: boolean;
}

export function FormCard({
  idPrefix = "hero",
  eyebrow = "Request a project quote",
  heading = "Tell us what you're building",
  subheading = "Share your scope and we'll come back with real numbers: species, processing, milling, and volume.",
  submitLabel = FORM_SUBMIT_LABEL,
  routeSlug,
  thankYouBody = "Thanks, your project inquiry is in. A member of the Wood Crafting team will review your scope and follow up directly to talk species, processing, and volume.",
  onDark = false,
}: FormCardProps) {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Mobile-only: the full SMS legal text is collapsed behind a disclosure so the
  // submit control stays within the first viewport. Desktop always shows it in full.
  const [consentExpanded, setConsentExpanded] = useState(false);

  // Synchronous re-entrancy guard: blocks duplicate fires from rapid clicks
  // before React re-renders with the disabled state.
  const inFlightRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});

  type TextFieldKey = Exclude<keyof FormState, "sms_consent">;

  const update = (k: TextFieldKey, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => {
      if (!(k in prev)) return prev;
      const key = k as FieldKey;
      if (!prev[key]) return prev;
      const err = validateField(key, v);
      if (err) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateSmsConsent = (checked: boolean) => {
    setData((d) => ({ ...d, sms_consent: checked }));
  };

  const markTouched = (k: FieldKey, currentValue: string) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const err = validateField(k, currentValue);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
  };

  // Success-gated conversion signal, emitted exactly once after a confirmed
  // {ok:true} lead. Both channels use the canonical "form_submit" event name:
  // the Mega optimizer beacon (MegaTag) and the GTM (GTM-PQBFMM3K) dataLayer.
  // Because this fires only from doSubmit()'s success branch — never from a
  // native/synthetic submit event — no empty click or duplicate can beacon.
  const fireTracking = () => {
    if (typeof window === "undefined") return;
    const route = routeSlug || window.location.pathname;
    window.MegaTag?.trackEvent?.("form_submit", {
      form_id: idPrefix,
      form_route: route,
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_submit",
      form_id: idPrefix,
      form_route: route,
    });
  };

  // Marks every required field touched and surfaces its errors. Returns true
  // when the form is clean. Shared by the button and the native-submit guard.
  const collectErrors = (): FieldErrors => {
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched({
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        company: true,
        product_needed: true,
        project_needs: true,
      });
    }
    return allErrors;
  };

  // Canonical submit entry (Hard Rule #6): the CTA is type="button", validates
  // FIRST, and only on a clean form calls formRef.requestSubmit() — so an
  // empty/invalid click never dispatches a native submit event or a request.
  const handleValidateAndSubmit = () => {
    if (inFlightRef.current || submitting || submitted) return;
    const allErrors = collectErrors();
    if (Object.keys(allErrors).length > 0) {
      const firstBad = REQUIRED_ORDER.find((k) => allErrors[k]);
      if (firstBad) {
        const el = fieldRefs.current[firstBad];
        try {
          el?.focus({ preventScroll: false });
        } catch {
          el?.focus();
        }
      }
      return;
    }
    formRef.current?.requestSubmit();
  };

  // The form's native submit handler: prevent the default navigation, then run
  // the guarded async submission. A stray Enter-key submit re-validates here
  // (defense in depth) so it can never send an invalid request.
  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void doSubmit();
  };

  const doSubmit = async () => {
    if (inFlightRef.current || submitting || submitted) return;
    if (Object.keys(collectErrors()).length > 0) return;
    inFlightRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      // camelCase form_data only: no snake_case duplicates.
      const res = await submit({
        firstName: data.first_name.trim(),
        lastName: data.last_name.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
        company: data.company.trim(),
        productNeeded: data.product_needed,
        projectNeeds: data.project_needs.trim(),
        smsConsent: data.sms_consent,
        smsConsentText: data.sms_consent
          ? "I agree to receive customer-care SMS/text messages from Wood Crafting LLC about my project inquiry, quote, order, appointments, reminders, and service updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase."
          : "Not provided",
        routeSlug:
          routeSlug ||
          (typeof window !== "undefined" ? window.location.pathname : "/"),
      });
      // A 2xx with a body that isn't {ok:true} is still a dropped lead. Only
      // confirmed success fires conversions and shows the thank-you card.
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
      // Fire the single canonical conversion signal only after confirmed
      // {ok:true}. No native/synthetic submit event is dispatched, so the
      // optimizer never auto-detects a duplicate conversion.
      fireTracking();
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // The visitor is fine, but the LEAD would be dropped: surface a retryable
      // error and fire NO tracking so we never bill a phantom conversion.
      setSubmitError(SUBMIT_ERROR_MESSAGE);
    } finally {
      // Do NOT reset inFlightRef: one confirmed-or-attempted submission per page
      // instance (Hard Rule #7) so no duplicate lead or conversion can fire.
      setSubmitting(false);
    }
  };

  const cardBase = `bg-white rounded-2xl border ${
    onDark ? "border-white/20" : "border-[var(--color-border)]"
  } shadow-card-lg`;

  if (submitted) {
    return (
      <div className={`${cardBase} p-8 md:p-10`}>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <Icon name="check" className="h-7 w-7 text-[var(--color-primary)]" strokeWidth={2.4} />
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--color-text)]">
            Inquiry received.
          </h3>
          <p className="text-base leading-relaxed text-[var(--color-muted)]">
            {thankYouBody}
          </p>
        </div>
      </div>
    );
  }

  const showErr = (k: FieldKey) => Boolean(touched[k] && errors[k]);
  const errId = (k: FieldKey) => `${idPrefix}-${k}-error`;
  const fieldCls =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 lg:py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-soft)] transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30";
  const inputCls = (k: FieldKey) => `${fieldCls} ${showErr(k) ? "lp-input-error" : ""}`;

  return (
    <form
      ref={formRef}
      onSubmit={handleNativeSubmit}
      noValidate
      aria-label="Request a project quote"
      className={`${cardBase} space-y-2.5 p-6 md:p-7 lg:py-5`}
    >
      <div className="mb-1 space-y-1">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="font-display text-xl leading-tight text-[var(--color-text)] md:text-[1.6rem]">
          {heading}
        </h3>
        <p className="text-sm leading-snug text-[var(--color-muted)]">{subheading}</p>
      </div>

      {/* First / Last */}
      <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
        <div>
          <label htmlFor={`${idPrefix}-first_name`} className="sr-only">First name</label>
          <input
            ref={(el) => { fieldRefs.current.first_name = el; }}
            id={`${idPrefix}-first_name`}
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            value={data.first_name}
            onChange={(e) => update("first_name", e.target.value)}
            onBlur={(e) => markTouched("first_name", e.target.value)}
            className={inputCls("first_name")}
            aria-invalid={showErr("first_name") || undefined}
            aria-describedby={showErr("first_name") ? errId("first_name") : undefined}
            disabled={submitting}
          />
          {showErr("first_name") && (
            <p id={errId("first_name")} role="alert" aria-live="polite" className="lp-field-error">
              {errors.first_name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-last_name`} className="sr-only">Last name</label>
          <input
            ref={(el) => { fieldRefs.current.last_name = el; }}
            id={`${idPrefix}-last_name`}
            name="last_name"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
            value={data.last_name}
            onChange={(e) => update("last_name", e.target.value)}
            onBlur={(e) => markTouched("last_name", e.target.value)}
            className={inputCls("last_name")}
            aria-invalid={showErr("last_name") || undefined}
            aria-describedby={showErr("last_name") ? errId("last_name") : undefined}
            disabled={submitting}
          />
          {showErr("last_name") && (
            <p id={errId("last_name")} role="alert" aria-live="polite" className="lp-field-error">
              {errors.last_name}
            </p>
          )}
        </div>
      </div>

      {/* Email + Phone: two-column at desktop, compact two-column on mobile */}
      <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
      {/* Email */}
      <div>
        <label htmlFor={`${idPrefix}-email`} className="sr-only">Work email</label>
        <input
          ref={(el) => { fieldRefs.current.email = el; }}
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          pattern={EMAIL_PATTERN}
          title="Enter a valid email address (e.g. you@company.com)"
          autoComplete="email"
          placeholder="Work email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={(e) => markTouched("email", e.target.value)}
          className={inputCls("email")}
          aria-invalid={showErr("email") || undefined}
          aria-describedby={showErr("email") ? errId("email") : undefined}
          disabled={submitting}
        />
        {showErr("email") && (
          <p id={errId("email")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone (required) */}
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="sr-only">Phone</label>
        <input
          ref={(el) => { fieldRefs.current.phone = el; }}
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          inputMode="numeric"
          required
          pattern={PHONE_PATTERN}
          title="Enter a valid 10-digit US phone number, e.g. (555) 123-4567"
          autoComplete="tel"
          placeholder="Phone (10 digits)"
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          onBlur={(e) => markTouched("phone", e.target.value)}
          className={inputCls("phone")}
          aria-invalid={showErr("phone") || undefined}
          aria-describedby={showErr("phone") ? errId("phone") : undefined}
          disabled={submitting}
        />
        {showErr("phone") && (
          <p id={errId("phone")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.phone}
          </p>
        )}
      </div>
      </div>

      {/* Company + Product: two-column at desktop, compact two-column on mobile */}
      <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
      {/* Company (required) */}
      <div>
        <label htmlFor={`${idPrefix}-company`} className="sr-only">
          Company / Organization
        </label>
        <input
          ref={(el) => { fieldRefs.current.company = el; }}
          id={`${idPrefix}-company`}
          name="company"
          type="text"
          required
          autoComplete="organization"
          placeholder="Company / Organization"
          value={data.company}
          onChange={(e) => update("company", e.target.value)}
          onBlur={(e) => markTouched("company", e.target.value)}
          className={inputCls("company")}
          aria-invalid={showErr("company") || undefined}
          aria-describedby={showErr("company") ? errId("company") : undefined}
          disabled={submitting}
        />
        {showErr("company") && (
          <p id={errId("company")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.company}
          </p>
        )}
      </div>

      {/* Product needed (required select) */}
      <div>
        <label htmlFor={`${idPrefix}-product_needed`} className="sr-only">Product needed</label>
        <div className="relative">
          <select
            ref={(el) => { fieldRefs.current.product_needed = el; }}
            id={`${idPrefix}-product_needed`}
            name="product_needed"
            required
            value={data.product_needed}
            onChange={(e) => {
              update("product_needed", e.target.value);
              markTouched("product_needed", e.target.value);
            }}
            onBlur={(e) => markTouched("product_needed", e.target.value)}
            className={`${inputCls("product_needed")} appearance-none pr-9 ${data.product_needed ? "" : "text-[var(--color-muted-soft)]"}`}
            aria-invalid={showErr("product_needed") || undefined}
            aria-describedby={showErr("product_needed") ? errId("product_needed") : undefined}
            disabled={submitting}
          >
            <option value="">Product needed</option>
            {PRODUCT_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-[var(--color-text)]">{o}</option>
            ))}
          </select>
          <ChevronDown />
        </div>
        {showErr("product_needed") && (
          <p id={errId("product_needed")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.product_needed}
          </p>
        )}
      </div>
      </div>

      {/* Project needs (required textarea) */}
      <div>
        <label htmlFor={`${idPrefix}-project_needs`} className="sr-only">
          Project details
        </label>
        <textarea
          ref={(el) => { fieldRefs.current.project_needs = el; }}
          id={`${idPrefix}-project_needs`}
          name="project_needs"
          rows={2}
          required
          placeholder="Project details: scope, rough quantities, timeline"
          value={data.project_needs}
          onChange={(e) => update("project_needs", e.target.value)}
          onBlur={(e) => markTouched("project_needs", e.target.value)}
          className={`${inputCls("project_needs")} resize-none`}
          aria-invalid={showErr("project_needs") || undefined}
          aria-describedby={showErr("project_needs") ? errId("project_needs") : undefined}
          disabled={submitting}
        />
        {showErr("project_needs") && (
          <p id={errId("project_needs")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.project_needs}
          </p>
        )}
      </div>

      {/* SMS/Text Messaging consent (optional, unchecked by default) */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3.5 lg:p-2.5">
        <label
          htmlFor={`${idPrefix}-sms_consent`}
          className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed lg:leading-snug text-[var(--color-muted)]"
        >
          <input
            id={`${idPrefix}-sms_consent`}
            name="sms_consent"
            type="checkbox"
            checked={data.sms_consent}
            onChange={(e) => updateSmsConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
            disabled={submitting}
          />
          <span>
            {/* Concise summary — shown on mobile only while collapsed. Desktop
                and the expanded mobile state show the full legal language below. */}
            <span className={consentExpanded ? "hidden" : "block lg:hidden"}>
              Text me customer-care updates about my project inquiry: quote, order,
              reminders and service. Msg &amp; data rates may apply; reply STOP to opt out.
            </span>
            {/* Full SMS consent language — always visible on desktop; on mobile only
                once expanded. Preserved verbatim for legal completeness. */}
            <span
              id={`${idPrefix}-sms_consent_full`}
              className={consentExpanded ? "block lg:block" : "hidden lg:block"}
            >
              I agree to receive customer-care SMS/text messages from Wood Crafting LLC
              about my project inquiry, quote, order, appointments, reminders, and service
              updates. Message frequency varies. Message and data rates may apply. Reply
              STOP to opt out or HELP for help. Consent is not a condition of purchase.
              View our{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-primary)] underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-primary)] underline">
                Terms of Service
              </a>
              .
            </span>
          </span>
        </label>
        {/* Mobile-only disclosure control. Full terms are always on-screen at lg,
            so the toggle is hidden there. Expanding never submits or tracks. */}
        <button
          type="button"
          onClick={() => setConsentExpanded((v) => !v)}
          aria-expanded={consentExpanded}
          aria-controls={`${idPrefix}-sms_consent_full`}
          className="mt-2 pl-6 text-[11px] font-semibold text-[var(--color-primary)] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 lg:hidden"
        >
          {consentExpanded ? "Hide full SMS terms" : "Read full SMS terms, Privacy Policy & Terms"}
        </button>
        <p className="mt-2 lg:mt-1.5 pl-6 text-[11px] leading-relaxed lg:leading-snug text-[var(--color-muted-soft)]">
          Optional. You may submit this form without consenting to text messages.
        </p>
      </div>

      {submitError && (
        <p
          role="alert"
          aria-live="polite"
          className="lp-field-error !mt-0 rounded-lg border border-[var(--color-error)]/35 bg-[#fef3f2] px-3.5 py-2.5"
        >
          {submitError}
        </p>
      )}

      <button
        type="button"
        onClick={handleValidateAndSubmit}
        disabled={submitting || submitted}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] active:translate-y-0 active:bg-[var(--color-primary-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[var(--color-primary-disabled)]"
      >
        {submitting ? "Sending…" : submitLabel}
        {!submitting && <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />}
      </button>

      <p className="text-center text-xs leading-relaxed text-[var(--color-muted)]">
        No spam: we only use your details to scope and quote your project.
      </p>
    </form>
  );
}

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
