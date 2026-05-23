import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { employees } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Performance — MfgCRM" },
      { name: "description", content: "Employee KPIs, monthly targets and conversion ratios." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const chartData = employees.map((e) => ({
    name: e.name.split(" ")[0],
    Closed: e.dealsClosed,
    Target: e.monthlyTarget,
  }));

  return (
    <div>
      <PageHeader title="Team Performance" description="How each BDA is tracking this month." />

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold">Deals Closed vs Target</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Target" fill="var(--color-muted)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Closed" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card shadow-card">
        <div className="border-b border-border p-4">
          <h3 className="text-base font-semibold">Employee Scorecard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Employee</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium text-right">Leads</th>
                <th className="px-4 py-3 font-medium text-right">Closed</th>
                <th className="px-4 py-3 font-medium text-right">Conv. %</th>
                <th className="px-4 py-3 font-medium">Target Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {employees.map((e) => {
                const pct = Math.round((e.achieved / e.monthlyTarget) * 100);
                return (
                  <tr key={e.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                          {e.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{e.name}</div>
                          <div className="text-xs text-muted-foreground">{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{e.role}</td>
                    <td className="px-4 py-3 text-right">{e.leadsHandled}</td>
                    <td className="px-4 py-3 text-right font-medium">{e.dealsClosed}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">{e.conversionRate}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-xs text-muted-foreground">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
