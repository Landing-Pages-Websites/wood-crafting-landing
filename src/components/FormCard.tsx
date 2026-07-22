"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { CTA, PHONE, PRODUCT_OPTIONS } from "@/lib/content";
import { Icon } from "@/components/icons";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

// ─── Validation (inline per-field, no native tooltips) ───

// RFC-5322-lite — the lead API server-validates the rest.
const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

// NANP: area code & exchange each start 2-9 and may not be an N11.
const NANP_RE = /^[2-9](?!11)\d{2}[2-9](?!11)\d{2}\d{4}$/;

// DOM field keys are snake_case; the submitted payload is mapped to camelCase
// so there is never a duplicate (e.g. firstName + first_name) in form_data.
type FieldKey =
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "product_needed";

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  product_needed: string;
  project_needs: string;
}

const INITIAL: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company: "",
  product_needed: "",
  project_needs: "",
};

type FieldErrors = Partial<Record<FieldKey, string>>;

// company + project_needs are optional and never block submission.
const REQUIRED_ORDER: FieldKey[] = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "product_needed",
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
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Phone number is required.";
      if (digits.length !== 10) return "Please enter a valid 10-digit phone number.";
      if (!NANP_RE.test(digits)) return "Please enter a valid US phone number.";
      return undefined;
    }
    case "product_needed":
      return value ? undefined : "Please select a product line.";
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
  /** Render on a dark band — softens the outer ring for contrast. */
  onDark?: boolean;
}

export function FormCard({
  idPrefix = "hero",
  eyebrow = "Request a project quote",
  heading = "Tell us what you're building",
  subheading = "Share your scope and we'll come back with real numbers — species, processing, milling, and volume.",
  submitLabel = CTA.primary,
  routeSlug,
  thankYouBody = "Thanks — your project inquiry is in. A member of the Wood Crafting team will review your scope and follow up directly to talk species, processing, and volume.",
  onDark = false,
}: FormCardProps) {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Synchronous re-entrancy guard — blocks duplicate fires from rapid clicks
  // before React re-renders with the disabled state.
  const inFlightRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});

  const update = (k: keyof FormState, v: string) => {
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

  const fireTracking = () => {
    if (typeof window === "undefined") return;
    const route =
      routeSlug || (typeof window !== "undefined" ? window.location.pathname : "/");
    // Mega optimizer event FIRST, then the required GTM dataLayer signal.
    window.MegaTag?.trackEvent?.("form_submission", { form_route: route });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submission", form_route: route });
  };

  // Button click validates FIRST, then hands off to the form's native submit
  // via requestSubmit(). The button is type="button" so the optimizer's
  // capture-phase listener never fires on empty/invalid clicks.
  const handleValidateAndSubmit = () => {
    if (inFlightRef.current || submitting || submitted) return;
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched({
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        product_needed: true,
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current || submitting || submitted) return;
    // Re-validate defensively — requestSubmit should only reach here when valid.
    if (Object.keys(validateAll(data)).length > 0) return;

    inFlightRef.current = true;
    setSubmitting(true);
    try {
      // camelCase form_data only — no snake_case duplicates.
      await submit({
        firstName: data.first_name.trim(),
        lastName: data.last_name.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
        company: data.company.trim(),
        productNeeded: data.product_needed,
        projectNeeds: data.project_needs.trim(),
        routeSlug:
          routeSlug ||
          (typeof window !== "undefined" ? window.location.pathname : "/"),
      });
      fireTracking();
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown error";
      // Non-fatal: still fire tracking + show thank-you so the user isn't stranded.
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form_error", form_error: message });
      }
      fireTracking();
      setSubmitted(true);
    } finally {
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
          <p className="text-sm text-[var(--color-muted)]">
            Prefer to talk now? Call{" "}
            <span className="font-semibold text-[var(--color-text)] whitespace-nowrap">
              {PHONE}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  const showErr = (k: FieldKey) => Boolean(touched[k] && errors[k]);
  const errId = (k: FieldKey) => `${idPrefix}-${k}-error`;
  const fieldCls =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-soft)] transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30";
  const inputCls = (k: FieldKey) => `${fieldCls} ${showErr(k) ? "lp-input-error" : ""}`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Request a project quote"
      className={`${cardBase} space-y-3.5 p-6 md:p-7`}
    >
      <div className="mb-1 space-y-1">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="font-display text-xl leading-tight text-[var(--color-text)] md:text-[1.6rem]">
          {heading}
        </h3>
        <p className="text-sm leading-snug text-[var(--color-muted)]">{subheading}</p>
      </div>

      {/* First / Last */}
      <div className="grid grid-cols-2 gap-3">
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

      {/* Email */}
      <div>
        <label htmlFor={`${idPrefix}-email`} className="sr-only">Work email</label>
        <input
          ref={(el) => { fieldRefs.current.email = el; }}
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
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

      {/* Phone */}
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="sr-only">Phone</label>
        <input
          ref={(el) => { fieldRefs.current.phone = el; }}
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          required
          inputMode="numeric"
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

      {/* Company (optional) */}
      <div>
        <label htmlFor={`${idPrefix}-company`} className="sr-only">
          Company (optional)
        </label>
        <input
          id={`${idPrefix}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company (optional)"
          value={data.company}
          onChange={(e) => update("company", e.target.value)}
          className={fieldCls}
          disabled={submitting}
        />
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

      {/* Project needs (optional textarea) */}
      <div>
        <label htmlFor={`${idPrefix}-project_needs`} className="sr-only">
          Project details (optional)
        </label>
        <textarea
          id={`${idPrefix}-project_needs`}
          name="project_needs"
          rows={3}
          placeholder="Project details — scope, rough quantities, timeline (optional)"
          value={data.project_needs}
          onChange={(e) => update("project_needs", e.target.value)}
          className={`${fieldCls} resize-none`}
          disabled={submitting}
        />
      </div>

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
        No spam — we only use your details to scope and quote your project.
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
