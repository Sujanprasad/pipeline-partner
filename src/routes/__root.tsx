import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, useRouterState,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AppShell } from "@/components/layout/AppShell";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">An unexpected error occurred.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MfgCRM — Manufacturing CRM & Sales Pipeline" },
      { name: "description", content: "Modern CRM dashboard for manufacturing BDA teams: leads, follow-ups, deals, team performance and client communication." },
      { property: "og:title", content: "MfgCRM — Manufacturing CRM & Sales Pipeline" },
      { name: "twitter:title", content: "MfgCRM — Manufacturing CRM & Sales Pipeline" },
      { property: "og:description", content: "Modern CRM dashboard for manufacturing BDA teams: leads, follow-ups, deals, team performance and client communication." },
      { name: "twitter:description", content: "Modern CRM dashboard for manufacturing BDA teams: leads, follow-ups, deals, team performance and client communication." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/feadd61e-625a-42aa-a06e-1160b27e02c5/id-preview-a6c8a440--57ef14ff-ae15-4a5f-9106-441e3cee26cf.lovable.app-1779557908665.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/feadd61e-625a-42aa-a06e-1160b27e02c5/id-preview-a6c8a440--57ef14ff-ae15-4a5f-9106-441e3cee26cf.lovable.app-1779557908665.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuth = pathname === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      {isAuth ? <Outlet /> : <AppShell><Outlet /></AppShell>}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
