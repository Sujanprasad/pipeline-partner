import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { StatCard } from "@/components/ui-kit/StatCard";
import { Users, TrendingUp, CheckCircle2, IndianRupee, Activity } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { salesGrowth, leadStatusDistribution, recentActivities, leads } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MfgCRM" },
      { name: "description", content: "Overview of leads, deals, revenue and team activity." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const totalLeads = 100;
  const activeDeals = leads.filter((l) => l.status === "Negotiation" || l.status === "Contacted").length + 12;
  const closedDeals = leads.filter((l) => l.status === "Closed").length + 28;
  const revenue = "₹74.2L";

  return (
    <div>
      <PageHeader
        title="Welcome back, Aarav"
        description="Here's what's happening across your pipeline today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Leads" value={String(totalLeads)} delta={12} icon={Users} accent="info" />
        <StatCard title="Active Deals" value={String(activeDeals)} delta={8} icon={TrendingUp} accent="primary" />
        <StatCard title="Closed Deals" value={String(closedDeals)} delta={-3} icon={CheckCircle2} accent="success" />
        <StatCard title="Monthly Revenue" value={revenue} delta={18} icon={IndianRupee} accent="warning" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Sales Growth</h3>
              <p className="text-xs text-muted-foreground">Revenue (₹ lakhs) over last 6 months</p>
            </div>
            <span className="rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">+24% YoY</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesGrowth}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">Lead Status</h3>
          <p className="mb-4 text-xs text-muted-foreground">Distribution across pipeline</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={leadStatusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {leadStatusDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold">Recent Activity</h3>
        </div>
        <ul className="space-y-4">
          {recentActivities.map((a) => (
            <li key={a.id} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                {a.user.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
