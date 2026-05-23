import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { StatusBadge } from "@/components/ui-kit/StatusBadge";
import { StatCard } from "@/components/ui-kit/StatCard";
import { deals } from "@/lib/mock-data";
import { IndianRupee, TrendingUp, Target, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Sales — MfgCRM" },
      { name: "description", content: "Track active deals, probability and expected close dates." },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  const totalPipeline = deals.reduce((s, d) => s + d.amount, 0);
  const closedWon = deals.filter((d) => d.stage === "Closed Won");
  const won = closedWon.reduce((s, d) => s + d.amount, 0);
  const avgProb = Math.round(deals.reduce((s, d) => s + d.probability, 0) / deals.length);

  const byStage = ["Prospecting", "Proposal", "Negotiation", "Closed Won"].map((stage) => ({
    stage,
    amount: deals.filter((d) => d.stage === stage).reduce((s, d) => s + d.amount, 0) / 100000,
  }));

  return (
    <div>
      <PageHeader title="Deals & Sales Tracking" description="Pipeline performance at a glance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Pipeline" value={`₹${(totalPipeline / 10000000).toFixed(2)}Cr`} icon={IndianRupee} accent="primary" delta={15} />
        <StatCard title="Closed Won" value={`₹${(won / 10000000).toFixed(2)}Cr`} icon={CheckCircle2} accent="success" delta={22} />
        <StatCard title="Avg. Probability" value={`${avgProb}%`} icon={TrendingUp} accent="info" delta={4} />
        <StatCard title="Active Deals" value={String(deals.filter((d) => !d.stage.startsWith("Closed")).length)} icon={Target} accent="warning" delta={-2} />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold">Pipeline by Stage (₹ lakhs)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byStage}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="stage" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="amount" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card shadow-card">
        <div className="border-b border-border p-4">
          <h3 className="text-base font-semibold">All Deals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium">Probability</th>
                <th className="px-4 py-3 font-medium">Expected Close</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deals.map((d) => (
                <tr key={d.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{d.company}</td>
                  <td className="px-4 py-3">{d.product}</td>
                  <td className="px-4 py-3 text-right font-medium">₹{(d.amount / 100000).toFixed(1)}L</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${d.probability}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{d.probability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{d.expectedClose}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.stage} /></td>
                  <td className="px-4 py-3">{d.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
