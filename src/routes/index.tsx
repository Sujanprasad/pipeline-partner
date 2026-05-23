import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { StatCard } from "@/components/ui-kit/StatCard";
import { StatusBadge } from "@/components/ui-kit/StatusBadge";
import { Users, TrendingUp, CheckCircle2, IndianRupee, Activity, Target, ArrowRight, Trophy } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { salesGrowth, leadStatusDistribution, recentActivities, leads, deals, employees, followUps } from "@/lib/mock-data";

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

  // Pipeline funnel (HubSpot-style)
  const pipelineStages = [
    { stage: "Prospecting", count: 32, value: 4200000 },
    { stage: "Proposal",    count: 21, value: 3100000 },
    { stage: "Negotiation", count: 14, value: 2400000 },
    { stage: "Closed Won",  count: 9,  value: 1900000 },
  ];
  const maxStage = Math.max(...pipelineStages.map((s) => s.count));

  // Top performers
  const topPerformers = [...employees]
    .sort((a, b) => b.dealsClosed - a.dealsClosed)
    .slice(0, 4);

  // Goal progress
  const teamTarget = employees.reduce((s, e) => s + e.monthlyTarget, 0);
  const teamAchieved = employees.reduce((s, e) => s + e.achieved, 0);
  const goalPct = Math.round((teamAchieved / teamTarget) * 100);

  // Today's follow-ups
  const todays = followUps.filter((f) => f.status !== "Completed").slice(0, 4);

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

      {/* Pipeline funnel + Goal */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Sales Pipeline</h3>
              <p className="text-xs text-muted-foreground">Deal flow across stages this quarter</p>
            </div>
            <Link to="/deals" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {pipelineStages.map((s) => {
              const pct = (s.count / maxStage) * 100;
              return (
                <div key={s.stage}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium">{s.stage}</span>
                    <span className="text-muted-foreground">
                      {s.count} deals · ₹{(s.value / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Monthly Goal</h3>
          </div>
          <div className="flex flex-col items-center justify-center py-3">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <path
                  className="stroke-muted"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                />
                <path
                  className="stroke-primary transition-all"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${goalPct}, 100`}
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{goalPct}%</span>
                <span className="text-[10px] text-muted-foreground">of target</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{teamAchieved}</span> of {teamTarget} deals closed
            </p>
            <span className="mt-2 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
              On track
            </span>
          </div>
        </div>
      </div>

      {/* Top performers + Today */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning-foreground" />
              <h3 className="text-base font-semibold">Top Performers</h3>
            </div>
            <Link to="/team" className="text-xs font-medium text-primary hover:underline">View team</Link>
          </div>
          <ul className="space-y-3">
            {topPerformers.map((e, i) => (
              <li key={e.id} className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                    {e.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {i === 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-[9px] font-bold text-warning-foreground">
                      1
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{e.name}</div>
                  <div className="text-[11px] text-muted-foreground">{e.dealsClosed} deals · {e.conversionRate}% conv.</div>
                </div>
                <div className="text-xs font-semibold text-success">
                  {Math.round((e.achieved / e.monthlyTarget) * 100)}%
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Today's Follow-ups</h3>
            <Link to="/followups" className="text-xs font-medium text-primary hover:underline">All</Link>
          </div>
          {todays.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">Nothing scheduled.</div>
          ) : (
            <ul className="space-y-3">
              {todays.map((f) => (
                <li key={f.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-[10px] font-semibold text-primary">
                    {f.time.split(":")[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{f.company}</p>
                      <StatusBadge status={f.status} />
                    </div>
                    <p className="truncate text-[11px] text-muted-foreground">{f.type} · {f.notes}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Top Deals</h3>
            <Link to="/deals" className="text-xs font-medium text-primary hover:underline">All</Link>
          </div>
          <ul className="space-y-3">
            {[...deals].sort((a, b) => b.amount - a.amount).slice(0, 4).map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{d.company}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{d.product}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₹{(d.amount / 100000).toFixed(1)}L</div>
                  <div className="text-[10px] text-muted-foreground">{d.probability}% likely</div>
                </div>
              </li>
            ))}
          </ul>
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
