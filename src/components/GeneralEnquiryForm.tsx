"use client";

import { useState } from "react";

const inputClasses =
  "w-full rounded-sm border border-line bg-pearl px-4 py-3 text-ink focus:border-gold focus:outline-none";
const labelClasses = "mb-2 block text-sm font-medium text-forest";

// Three fields, matching content/general-enquiry-form.html exactly — "the lowest-commitment
// contact point on the entire site," per content/forms/general-enquiry-build-spec.md. Wired to
// src/app/api/general-enquiry/route.ts, which notifies hello@alwaysenoughmethod.com — that
// mailbox does not exist yet, see docs/BUILD_LOG.md.
export function GeneralEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (status === "success") {
    return (
      <div className="text-center" role="status">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white"
        >
          ✓
        </div>
        <h3 className="font-display mb-2 text-2xl text-forest">Got it, thank you.</h3>
        <p className="text-sm text-ink/80">
          Your question has been sent. I&rsquo;ll get back to you personally within 2–3 working
          days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setStatus("loading");
        setErrorMessage(null);
        try {
          const response = await fetch("/api/general-enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("message"),
              website: formData.get("website"),
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
      <div>
        <label className={labelClasses} htmlFor="ge-name">
          First name <span className="text-gold">*</span>
        </label>
        <input id="ge-name" name="name" type="text" required autoComplete="given-name" className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses} htmlFor="ge-email">
          Email <span className="text-gold">*</span>
        </label>
        <input id="ge-email" name="email" type="email" required autoComplete="email" className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses} htmlFor="ge-message">
          What&rsquo;s on your mind? <span className="text-gold">*</span>
        </label>
        <textarea
          id="ge-message"
          name="message"
          required
          rows={4}
          placeholder="Ask whatever's on your mind, no question is too small."
          className={inputClasses}
        />
      </div>
      {/* Honeypot: real visitors never see or fill this. */}
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Leave this field blank
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-sm bg-forest px-6 py-4 text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send My Question"}
      </button>
      <p className="text-center text-xs text-ink/60">
        I usually reply within 2–3 working days.
      </p>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-error">
          {errorMessage} You can also email{" "}
          <a href="mailto:hello@alwaysenoughmethod.com" className="underline underline-offset-4">
            hello@alwaysenoughmethod.com
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
