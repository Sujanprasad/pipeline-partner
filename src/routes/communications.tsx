import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { StatusBadge } from "@/components/ui-kit/StatusBadge";
import { commLogs } from "@/lib/mock-data";
import { Phone, Mail, Users } from "lucide-react";

export const Route = createFileRoute("/communications")({
  head: () => ({
    meta: [
      { title: "Client Communications — MfgCRM" },
      { name: "description", content: "Timeline of calls, meetings and email discussions with clients." },
    ],
  }),
  component: CommPage,
});

const icon = { Call: Phone, Meeting: Users, Email: Mail };

function CommPage() {
  return (
    <div>
      <PageHeader title="Client Communication Logs" description="A timeline of every touchpoint with your clients." />

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <ol className="relative space-y-6 border-l border-border pl-6">
          {commLogs.map((c) => {
            const Icon = icon[c.type];
            return (
              <li key={c.id} className="relative">
                <span className="absolute -left-[34px] flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary ring-4 ring-card">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-card">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{c.client}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{c.company}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <StatusBadge status={c.type} />
                      <span className="text-xs text-muted-foreground">{c.date}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
                  <div className="mt-2 text-xs text-muted-foreground">Logged by <span className="font-medium text-foreground">{c.by}</span></div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
