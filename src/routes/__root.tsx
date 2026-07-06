import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { SplashGate } from "@/components/site/splash-screen";
import { ThemeProvider } from "@/components/site/theme-provider";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, organizationSchema, websiteSchema } from "@/lib/seo";
import { ChatbotTrigger } from "@/components/site/chatbot-trigger";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-6xl">Off the map.</h1>
        <p className="mt-4 text-muted-foreground">
          The page you were looking for is not here. It may have moved, or never existed.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border hairline px-5 py-2 text-sm hover:bg-foreground hover:text-background transition"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something interrupted this page.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-foreground px-5 py-2 text-sm text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border hairline px-5 py-2 text-sm hover:bg-foreground hover:text-background transition"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const rootMeta = defaultMeta();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      ...rootMeta.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      ...rootMeta.links,
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <HeadContent />
        <StructuredData data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SplashGate>
          <SiteNav />
          <main className="min-h-screen pt-14 md:pt-16 lg:pt-20">
            <Outlet />
          </main>
          <SiteFooter />
          <ChatbotTrigger />
        </SplashGate>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
