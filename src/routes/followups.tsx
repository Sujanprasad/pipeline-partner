import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { StatusBadge } from "@/components/ui-kit/StatusBadge";
import { followUps } from "@/lib/mock-data";
import { Calendar, Clock, Plus, Phone, Mail, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/followups")({
  head: () => ({
    meta: [
      { title: "Follow-ups — MfgCRM" },
      { name: "description", content: "Upcoming follow-ups, reminders and meeting notes." },
    ],
  }),
  component: FollowUpsPage,
});

const typeIcon = { Call: Phone, Meeting: Users, Email: Mail };

function FollowUpsPage() {
  const [items, setItems] = useState(followUps);
  const [note, setNote] = useState("");

  const upcoming = items.filter((f) => f.status !== "Completed");
  const done = items.filter((f) => f.status === "Completed");

  const markDone = (id: string) => {
    setItems((arr) => arr.map((f) => (f.id === id ? { ...f, status: "Completed" } : f)));
    toast.success("Follow-up marked as completed");
  };

  return (
    <div>
      <PageHeader
        title="Follow-up Management"
        description="Stay on top of every commitment with clients."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Schedule Follow-up
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
            <Calendar className="h-5 w-5 text-primary" /> Upcoming
          </h3>
          {upcoming.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">No upcoming follow-ups. You're all caught up!</div>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((f) => {
                const Icon = typeIcon[f.type];
                return (
                  <li
                    key={f.id}
                    className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-card"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-[180px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{f.company}</span>
                        <StatusBadge status={f.status} />
                      </div>
                      <div className="text-xs text-muted-foreground">{f.client} · {f.notes}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-4 w-4" /> {f.date} · {f.time}
                    </div>
                    <div className="text-xs text-muted-foreground">{f.assignedTo}</div>
                    <button
                      onClick={() => markDone(f.id)}
                      className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      Mark done
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 text-base font-semibold">Quick Note</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Add a note about a recent interaction…"
              className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <button
              onClick={() => { if (note.trim()) { toast.success("Note saved"); setNote(""); } }}
              className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Save note
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 text-base font-semibold">Completed</h3>
            <ul className="space-y-2 text-sm">
              {done.length === 0 ? (
                <li className="text-xs text-muted-foreground">Nothing completed yet.</li>
              ) : (
                done.map((f) => (
                  <li key={f.id} className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
                    <span className="truncate">{f.company}</span>
                    <span className="text-xs text-muted-foreground">{f.date}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
