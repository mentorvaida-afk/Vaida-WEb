"use client";

// Custom global error boundary, replacing Next.js's auto-generated default. Required at the
// root because this file must render its own <html>/<body>, it's outside the root layout.
// Kept deliberately simple and on-brand rather than a bare framework fallback.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col items-center justify-center bg-pearl px-6 text-center">
        <h1 className="font-display mb-4 text-3xl text-forest">Something went wrong.</h1>
        <p className="mb-8 max-w-md text-ink">
          Please try again, or email{" "}
          <a href="mailto:hello@alwaysenoughmethod.com" className="underline">
            hello@alwaysenoughmethod.com
          </a>{" "}
          if this keeps happening.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-forest-deep"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
