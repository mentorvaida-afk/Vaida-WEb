"use client";

import { useState } from "react";

type EmailCaptureFormProps = {
  endpoint: string;
  fieldLabel: string;
  placeholder?: string;
  buttonLabel?: string;
  consentText: string;
  requireConsentCheckbox?: boolean;
  extraFields?: Record<string, string>;
  successHeading: string;
  successBody: string;
  fallbackEmail?: string;
};

// Wired to a real Stage 06 route handler (see src/app/api/*/route.ts), all of which call
// SendPulse — the provider Vaida chose, see docs/BUILD_LOG.md. Includes a honeypot field
// ("website", hidden via CSS not `display:none`/`hidden`, so real screen readers and bots that
// only skip hidden attributes both still see it, but sighted humans never do) and fails
// gracefully with a fallback email address, per docs/ATTACK_ANALYSIS.md.
export function EmailCaptureForm({
  endpoint,
  fieldLabel,
  placeholder = "Your email address",
  buttonLabel = "Notify me",
  consentText,
  requireConsentCheckbox = false,
  extraFields,
  successHeading,
  successBody,
  fallbackEmail = "hello@alwaysenoughmethod.com",
}: EmailCaptureFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [consented, setConsented] = useState(false);

  if (status === "success") {
    return (
      <div className="text-center" role="status">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-forest-deep"
        >
          ✓
        </div>
        <h3 className="font-display mb-2 text-2xl">{successHeading}</h3>
        <p className="text-sm text-ink/80">{successBody}</p>
      </div>
    );
  }

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:gap-2"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);

          if (requireConsentCheckbox && !consented) {
            setErrorMessage("Please agree to receive this before submitting.");
            return;
          }

          setStatus("loading");
          setErrorMessage(null);

          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: formData.get("email"),
                website: formData.get("website"),
                consent: requireConsentCheckbox ? consented : undefined,
                ...extraFields,
              }),
            });

            if (!response.ok) {
              const data = await response.json().catch(() => ({}));
              throw new Error(data.error ?? "Something went wrong.");
            }

            setStatus("success");
          } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
          }
        }}
      >
        <label className="sr-only" htmlFor={`email-capture-${endpoint}`}>
          {fieldLabel}
        </label>
        <input
          id={`email-capture-${endpoint}`}
          name="email"
          type="email"
          required
          placeholder={placeholder}
          className="flex-1 rounded-sm border border-line bg-pearl px-4 py-3 text-ink focus:border-gold focus:outline-none"
        />
        {/* Honeypot: real visitors never see or fill this. */}
        <label className="absolute -left-[9999px]" aria-hidden="true">
          Leave this field blank
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap rounded-sm bg-gold px-6 py-3 text-sm font-medium uppercase tracking-wide text-forest-deep transition-opacity hover:opacity-85 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          {status === "loading" ? "Sending…" : buttonLabel}
        </button>
      </form>

      {requireConsentCheckbox && (
        <label className="mt-3 flex items-start gap-2 text-xs text-ink/70">
          <input
            type="checkbox"
            checked={consented}
            onChange={(event) => setConsented(event.target.checked)}
            className="mt-0.5"
          />
          {consentText}
        </label>
      )}
      {!requireConsentCheckbox && <p className="mt-3 text-xs text-ink/60">{consentText}</p>}

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-error">
          {errorMessage} You can also email{" "}
          <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">
            {fallbackEmail}
          </a>{" "}
          directly.
        </p>
      )}
    </div>
  );
}
