import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Factory, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — MfgCRM" },
      { name: "description", content: "Sign in to your Manufacturing CRM workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Signed in successfully");
      navigate({ to: "/" });
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-background p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold">MfgCRM</div>
              <div className="text-xs text-muted-foreground">BDA Workspace</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your pipeline and team.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  defaultValue="aarav@mfgcrm.com"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={show ? "text" : "password"}
                  required
                  defaultValue="demo1234"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-10 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" /> Remember me
              </label>
              <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Demo:</span> any email & password works.
              Role-based dashboards available for BDA, Manager and Admin.
            </div>
          </form>
        </div>
      </div>

      <div className="relative hidden bg-sidebar p-12 text-sidebar-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, var(--color-sidebar-primary) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--color-chart-2) 0%, transparent 40%)",
        }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/60 px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live · 5 team members online
          </div>
          <h2 className="mt-8 text-3xl font-bold leading-tight">
            Built for manufacturing<br />sales teams that ship.
          </h2>
          <p className="mt-3 max-w-md text-sm text-sidebar-foreground/70">
            One workspace for leads, follow-ups, deals and team performance — designed for BDA workflows.
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { v: "₹74.2L", l: "Pipeline this month" },
            { v: "21", l: "Deals closed" },
            { v: "28%", l: "Avg. conv. rate" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
              <div className="text-xl font-bold">{s.v}</div>
              <div className="text-xs text-sidebar-foreground/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
