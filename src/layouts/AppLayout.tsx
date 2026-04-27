import type { ReactNode } from 'react';
import { useState } from 'react';

type AppLayoutProps = {
  children: ReactNode;
  onNavigate: (page: 'home' | 'generator') => void;
};

export default function AppLayout({ children, onNavigate }: AppLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-slate-100 flex flex-col">
      <header className="border-b border-slate-700 bg-card/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <p className="text-xl font-bold text-slate-100 sm:text-lg">ContentForge</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-105 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="text-slate-300 hover:text-primary transition-all duration-200 hover:scale-105 font-medium"
            >
              Generator
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-primary hover:bg-slate-800 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-card/95 backdrop-blur-md">
            <nav className="mx-auto max-w-6xl px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-slate-300 hover:text-primary hover:bg-slate-800 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('generator');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-slate-300 hover:text-primary hover:bg-slate-800 rounded-lg transition-all duration-200 font-medium"
              >
                Generator
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-slate-700 bg-card/90 py-6 mt-auto">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
          Built for clean structure and extensible React development.
        </div>
      </footer>
    </div>
  );
}
