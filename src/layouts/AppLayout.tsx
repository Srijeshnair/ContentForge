import type { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">ContentForge</p>
            <p className="text-xs text-slate-500">Scalable Vite starter with Tailwind.</p>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-slate-200 bg-white/90 py-4">
        <div className="mx-auto max-w-6xl px-6 text-sm text-slate-500 sm:px-8 lg:px-12">
          Built for clean structure and extensible React development.
        </div>
      </footer>
    </div>
  );
}
