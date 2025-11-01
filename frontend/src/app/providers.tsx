import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

type AppProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const shouldEnableMocks =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== 'false';

export function AppProviders({ children }: AppProvidersProps) {
  const [isMockReady, setMockReady] = useState(!shouldEnableMocks);

  useEffect(() => {
    if (!shouldEnableMocks) {
      return;
    }

    

    let cancelled = false;

    (async () => {
      const { worker } = await import('../mocks/browser');
      if (!cancelled) {
        await worker.start({ onUnhandledRequest: 'bypass' });
        setMockReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isMockReady ? (
        children
      ) : (
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Preparing mock server…
        </div>
      )}
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
