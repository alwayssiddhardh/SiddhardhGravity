import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParticleCursor } from "@/components/particle-cursor";
import { ScrollBackground } from "@/components/scroll-bg";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Astronaut404 } from "@/components/astronaut-404";

function NotFoundComponent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-90">
        <Astronaut404 className="h-full w-full" />
      </div>
      <div className="relative z-10 min-h-screen grid place-items-center px-4 text-center pointer-events-none">
        <div className="pointer-events-auto backdrop-blur-sm bg-background/30 rounded-3xl px-8 py-10 border border-border">
          <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Lost in orbit</div>
          <h1 className="text-rainbow text-7xl md:text-9xl font-black mt-3">404</h1>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto">
            Looks like this page drifted past the gravity well. The astronaut is keeping watch.
          </p>
          <a href="/" className="btn-rainbow mt-6 inline-flex">Take me home</a>
        </div>
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
    <div className="min-h-screen grid place-items-center px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-rainbow">Try again</button>
          <a href="/" className="btn-ghost-rainbow">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScroll />
        <ScrollBackground />
        <ParticleCursor />
        <Navbar />
        <main className="pt-24 relative">
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
