import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

// Shared layout placeholder: add navigation, sidebars, top bars when implementing UI.
function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {children}
    </div>
  );
}

export default AppLayout;
