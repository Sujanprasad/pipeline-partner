import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, CalendarClock, TrendingUp, Trophy, MessageSquare,
  Search, Bell, Menu, Factory, LogOut, ChevronLeft, Plus, Sun, Moon,
  CheckCheck, UserPlus, CalendarPlus, Briefcase, AtSign, Sparkles, Settings, HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { notificationsSeed, type AppNotification, type NotificationType } from "@/lib/mock-data";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/followups", label: "Follow-ups", icon: CalendarClock },
  { to: "/deals", label: "Deals", icon: TrendingUp },
  { to: "/team", label: "Team", icon: Trophy },
  { to: "/communications", label: "Communications", icon: MessageSquare },
];

const notifIcon: Record<NotificationType, typeof Briefcase> = {
  deal: Briefcase,
  lead: UserPlus,
  followup: CalendarClock,
  mention: AtSign,
  system: Sparkles,
};

const notifAccent: Record<NotificationType, string> = {
  deal: "bg-success/10 text-success",
  lead: "bg-info/10 text-info",
  followup: "bg-warning/15 text-warning-foreground",
  mention: "bg-primary-soft text-primary",
  system: "bg-muted text-muted-foreground",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(notificationsSeed);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("mfgcrm-theme")) as
      | "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("mfgcrm-theme", next);
  };

  const unread = notifications.filter((n) => !n.read).length;
  const markAll = () => {
    setNotifications((arr) => arr.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };
  const markOne = (id: string) =>
    setNotifications((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:static",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Factory className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">MfgCRM</div>
              <div className="truncate text-xs text-sidebar-foreground/60">BDA Workspace</div>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="mx-3 mb-3 rounded-lg border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" /> Pro tip
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-sidebar-foreground/70">
              Press <kbd className="rounded bg-sidebar px-1">⌘K</kbd> to quickly search leads & deals.
            </p>
          </div>
        )}

        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </Link>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="mt-2 hidden w-full items-center justify-center rounded-lg px-3 py-2 text-xs text-sidebar-foreground/60 hover:bg-sidebar-accent lg:flex"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur lg:px-8">
          <button
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search leads, deals, clients…"
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-14 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-block">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {/* Quick add */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:inline-flex">
                  <Plus className="h-4 w-4" /> Create
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Quick create</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: "/leads" })}>
                  <UserPlus className="mr-2 h-4 w-4" /> New lead
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/deals" })}>
                  <Briefcase className="mr-2 h-4 w-4" /> New deal
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/followups" })}>
                  <CalendarPlus className="mr-2 h-4 w-4" /> Schedule follow-up
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/communications" })}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Log communication
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-md p-2 hover:bg-muted"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Notifications"
                  className="relative rounded-md p-2 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <Bell className="h-5 w-5" />
                  {unread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                      {unread}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[22rem] p-0">
                <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Notifications</span>
                    {unread > 0 && (
                      <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary">
                        {unread} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAll}
                    disabled={unread === 0}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                  </button>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-10 text-center text-xs text-muted-foreground">
                      You're all caught up 🎉
                    </li>
                  ) : (
                    notifications.map((n) => {
                      const Icon = notifIcon[n.type];
                      return (
                        <li key={n.id}>
                          <button
                            onClick={() => markOne(n.id)}
                            className={cn(
                              "flex w-full items-start gap-3 border-b border-border px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-muted/40",
                              !n.read && "bg-primary-soft/30"
                            )}
                          >
                            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", notifAccent[n.type])}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium">{n.title}</p>
                                {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                              </div>
                              <p className="line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                              <p className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</p>
                            </div>
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
                <div className="border-t border-border p-2">
                  <button
                    onClick={() => toast("Notification center coming soon")}
                    className="w-full rounded-md px-3 py-2 text-center text-xs font-medium text-primary hover:bg-primary-soft"
                  >
                    View all notifications
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 flex items-center gap-3 rounded-full border border-border bg-background py-1 pl-1 pr-3 transition-colors hover:bg-muted">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    AS
                  </div>
                  <div className="hidden text-left sm:block">
                    <div className="text-xs font-semibold leading-tight">Aarav Sharma</div>
                    <div className="text-[10px] text-muted-foreground">Senior BDA</div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm font-semibold">Aarav Sharma</div>
                  <div className="text-[11px] font-normal text-muted-foreground">aarav@mfgcrm.com</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => toast("Profile settings coming soon")}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast("Help docs coming soon")}>
                  <HelpCircle className="mr-2 h-4 w-4" /> Help & support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: "/login" })} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
