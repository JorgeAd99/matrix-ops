import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import GlobalNav from '@/components/GlobalNav';
import ThemeProvider from '@/components/ThemeProvider';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import Footer from '@/components/Footer';
import ChangelogBanner from '@/components/ChangelogBanner';
import WelcomeModal from '@/components/WelcomeModal';
import React from 'react';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <GlobalNav />
      <main style={{ paddingTop: 80, flex: 1, width: '100%' }}>
        <Outlet />
      </main>
      <Footer />
      <ChangelogBanner />
      <PWAInstallBanner />
      <WelcomeModal />
      {process.env.NODE_ENV === 'development' && (
        <React.Suspense fallback={null}>
          <TanStackRouterDevtools position="bottom-right" />
        </React.Suspense>
      )}
    </ThemeProvider>
  ),
});

