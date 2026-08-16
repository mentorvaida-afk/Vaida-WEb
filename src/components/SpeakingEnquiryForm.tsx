"use client";

import { useState } from "react";

const AUDIENCES = [
  "Corporate & HR",
  "AI Confidence Training",
  "Women's Empowerment & Midlife Events",
  "Financial Services & Advisers",
  "Other",
];

const FORMATS = [
  "Keynote address",
  "Half-day workshop",
  "Full-day workshop",
  "Seminar",
  "One-to-one / small group",
  "Not sure yet",
];

const inputClasses =
  "w-full rounded-sm border border-line bg-pearl px-4 py-3 text-ink focus:border-gold focus:outline-none";
const labelClasses = "mb-2 block text-sm font-medium text-forest";

// Fields match content/speaking-enquiry-form.html exactly. Wired to
// src/app/api/speaking-enquiry/route.ts, which notifies speaking@alwaysenoughmethod.com —
// that mailbox does not exist yet, see docs/BUILD_LOG.md. The build spec's Google Sheets backup
// log is not wired here, it needs setting up directly in Vaida's account.
export function SpeakingEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audiences, setAudiences] = useState<string[]>([]);

  if (status === "success") {
    return (
      <div className="text-center" role="status">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white"
        >
          ✓
        </div>
        <h3 className="font-display mb-2 text-2xl text-forest">Thank you.</h3>
        <p className="text-sm text-ink/80">
          Your enquiry has been sent. I&rsquo;ll be in touch within 2–3 working days with
          availability and options suited to your event.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6 text-left"
      onSubmit={async (event) => {
        event.preventDefault();
        if (audiences.length === 0) {
          setErrorMessage("Please select at least one audience type.");
          return;
        }
        const formData = new FormData(event.currentTarget);
        setStatus("loading");
        setErrorMessage(null);
        try {
          const response = await fetch("/api/speaking-enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              organisation: formData.get("organisation"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              audience: audiences,
              format: formData.get("format"),
              delivery: formData.get("delivery"),
              audienceSize: formData.get("audienceSize"),
              eventDate: formData.get("eventDate"),
              location: formData.get("location"),
              message: formData.get("message"),
              source: formData.get("source"),
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="se-name">
            Full name <span className="text-gold">*</span>
          </label>
          <input id="se-name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses} htmlFor="se-org">
            Organisation <span className="text-ink/50">(if applicable)</span>
          </label>
          <input id="se-org" name="organisation" type="text" autoComplete="organization" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="se-email">
            Email <span className="text-gold">*</span>
          </label>
          <input id="se-email" name="email" type="email" required autoComplete="email" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses} htmlFor="se-phone">
            Phone <span className="text-ink/50">(optional)</span>
          </label>
          <input id="se-phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </div>
      </div>

      <fieldset>
        <legend className={labelClasses}>
          Who is this for? <span className="text-gold">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((audience) => {
            const checked = audiences.includes(audience);
            return (
              <label
                key={audience}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                  checked ? "border-forest bg-forest text-white" : "border-line bg-pearl text-ink"
                }`}
              >
                <input
                  type="checkbox"
                  name="audience"
                  value={audience}
                  checked={checked}
                  onChange={() =>
                    setAudiences((prev) =>
                      checked ? prev.filter((a) => a !== audience) : [...prev, audience],
                    )
                  }
                  className="sr-only"
                />
                {audience}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="se-format">
            Preferred format <span className="text-gold">*</span>
          </label>
          <select id="se-format" name="format" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Select one
            </option>
            {FORMATS.map((format) => (
              <option key={format}>{format}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses} htmlFor="se-delivery">
            In person or online? <span className="text-gold">*</span>
          </label>
          <select id="se-delivery" name="delivery" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Select one
            </option>
            <option>In person</option>
            <option>Online</option>
            <option>Either works</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="se-size">
            Approximate audience size
          </label>
          <input
            id="se-size"
            name="audienceSize"
            type="text"
            placeholder="e.g. 25, 150, not yet known"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="se-date">
            Event date <span className="text-ink/50">(or timeframe)</span>
          </label>
          <input
            id="se-date"
            name="eventDate"
            type="text"
            placeholder="e.g. 14 March 2027, or Spring 2027"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="se-location">
          Location <span className="text-ink/50">(city/country, if in person)</span>
        </label>
        <input id="se-location" name="location" type="text" placeholder="e.g. London, UK" className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses} htmlFor="se-message">
          What would you like this session to achieve? <span className="text-gold">*</span>
        </label>
        <textarea id="se-message" name="message" required rows={4} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses} htmlFor="se-source">
          How did you hear about me? <span className="text-ink/50">(optional)</span>
        </label>
        <input
          id="se-source"
          name="source"
          type="text"
          placeholder="e.g. LinkedIn, referral, a previous talk"
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
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </button>
      <p className="text-center text-xs text-ink/60">
        I read every enquiry personally and typically reply within 2–3 working days.
      </p>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-error">
          {errorMessage} You can also email{" "}
          <a href="mailto:speaking@alwaysenoughmethod.com" className="underline underline-offset-4">
            speaking@alwaysenoughmethod.com
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
