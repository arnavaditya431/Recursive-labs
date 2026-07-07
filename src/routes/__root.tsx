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
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, organizationSchema, websiteSchema } from "@/lib/seo";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll";
import { PageTransition } from "@/components/site/page-transition";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { ChatbotTrigger } from "@/components/site/chatbot-trigger";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--kagaz)] px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow">Error 404</p>
        <h1 className="mt-4 text-display">Off the map.</h1>
        <p className="mt-4 text-body text-[var(--dhul)]">
          The page you were looking for is not here. It may have moved, or never existed.
        </p>
        <Link
          to="/"
          className="mt-8 btn-recursive inline-flex"
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
    <div className="flex min-h-screen items-center justify-center bg-[var(--kagaz)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-title">Something interrupted this page.</h1>
        <p className="mt-3 text-body text-[var(--dhul)]">
          Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-recursive bg-[var(--syahi)] text-[var(--kagaz)] hover:bg-[var(--nila)] hover:border-[var(--nila)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-recursive"
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
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fira+Code:wght@300;400;500&display=swap",
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
    <html lang="en">
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
      <SmoothScrollProvider>
        <SplashGate>
          <PageTransition />
          <NoiseOverlay />
          <CustomCursor />
          <SiteNav />
          <main className="min-h-screen pt-14 md:pt-16 lg:pt-20">
            <Outlet />
          </main>
          <ChatbotTrigger />
          <SiteFooter />
        </SplashGate>
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}
