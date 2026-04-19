import type { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
  onNavigate: (page: 'home' | 'generator') => void;
};

export default function AppLayout({ children, onNavigate }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center space-x-4">
            <p className="text-lg font-bold text-slate-900">ContentForge</p>
          </div>
          <nav className="flex space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-slate-700 hover:text-slate-900 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="text-slate-700 hover:text-slate-900 transition-colors"
            >
              Generator
            </button>
          </nav>
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
