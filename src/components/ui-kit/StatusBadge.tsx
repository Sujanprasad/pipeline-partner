import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  New: "bg-info/10 text-info border-info/20",
  Contacted: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Negotiation: "bg-warning/15 text-warning-foreground border-warning/30",
  Closed: "bg-success/10 text-success border-success/20",
  Pending: "bg-info/10 text-info border-info/20",
  Completed: "bg-success/10 text-success border-success/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
  Prospecting: "bg-muted text-muted-foreground border-border",
  Proposal: "bg-info/10 text-info border-info/20",
  "Closed Won": "bg-success/10 text-success border-success/20",
  "Closed Lost": "bg-destructive/10 text-destructive border-destructive/20",
  Call: "bg-primary-soft text-primary border-primary/20",
  Meeting: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  Email: "bg-chart-2/10 text-chart-2 border-chart-2/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        map[status] ?? "bg-muted text-muted-foreground border-border"
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
