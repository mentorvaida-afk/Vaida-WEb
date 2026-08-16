import { Fragment } from "react";

// Renders **bold** inline within an otherwise plain paragraph of already-approved copy.
// Deliberately minimal: this content never uses italics, links, or other inline markdown, per
// docs/BRAND_CONTEXT.md's plain-vocabulary rule, so a full markdown parser isn't needed.
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type ProseProps = {
  blocks: string[];
  className?: string;
};

function isBulletList(block: string): boolean {
  const lines = block.split("\n").filter(Boolean);
  return lines.length > 0 && lines.every((line) => line.trim().startsWith("- "));
}

export function Prose({ blocks, className = "" }: ProseProps) {
  return (
    <div className={`space-y-5 ${className}`}>
      {blocks.map((block, i) =>
        isBulletList(block) ? (
          <ul key={i} className="list-disc space-y-2 pl-5">
            {block
              .split("\n")
              .filter(Boolean)
              .map((line, j) => (
                <li key={j}>{renderInline(line.trim().slice(2))}</li>
              ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(block)}</p>
        ),
      )}
    </div>
  );
}
