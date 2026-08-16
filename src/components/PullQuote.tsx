type PullQuoteProps = {
  quote: string;
  attribution: string;
  rating?: number;
};

// Distinct pull-quote treatment called for explicitly in the Reset and Books structural
// handoffs, for the Vita T. testimonial and the Amazon reviews respectively.
export function PullQuote({ quote, attribution, rating }: PullQuoteProps) {
  return (
    <blockquote className="border-l-2 border-gold pl-6">
      {rating && (
        <div aria-hidden="true" className="mb-2 text-gold">
          {"★".repeat(rating)}
        </div>
      )}
      <p className="font-display text-xl italic text-forest-deep">&ldquo;{quote}&rdquo;</p>
      <cite className="mt-3 block text-sm not-italic text-ink/70">{attribution}</cite>
    </blockquote>
  );
}
