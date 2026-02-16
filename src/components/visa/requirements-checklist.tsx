import { CheckCircle2 } from "lucide-react";

interface RequirementsChecklistProps {
  items: string[];
  title?: string;
}

export function RequirementsChecklist({
  items,
  title = "Requirements",
}: RequirementsChecklistProps) {
  return (
    <div>
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      )}
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/80 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
