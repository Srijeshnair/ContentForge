import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

type OutputCardProps = {
  content: string;
  label?: string;
  onRegenerate: () => void;
  isLoading?: boolean;
};

export default function OutputCard({ content, label = 'Generated Content', onRegenerate, isLoading = false }: OutputCardProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = async () => {
    if (!content) {
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('failed');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-slate-700 bg-card p-4 shadow-2xl shadow-slate-900/30 transition-all duration-300 hover:shadow-slate-900/40 sm:mt-8 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">Output</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-100 sm:mt-2 sm:text-2xl lg:text-3xl">{label}</h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6 lg:text-base">
            Review the content below, copy it instantly, or regenerate a fresh version with one click.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-200 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card sm:px-5 sm:py-3 sm:text-sm"
          >
            {copyStatus === 'copied' ? 'Copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none disabled:opacity-50 disabled:hover:scale-100 sm:px-5 sm:py-3 sm:text-sm"
          >
            <span className={`inline-flex items-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Regenerate
            </span>
            {isLoading && (
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                <LoadingSpinner size="sm" className="mr-1 sm:mr-2" />
                <span className="text-xs">Generating...</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-slate-100 shadow-inner transition-all duration-200 hover:border-slate-500 sm:mt-6 sm:p-6 lg:p-8">
        <div className="min-h-[120px] whitespace-pre-wrap break-words text-sm leading-6 sm:min-h-[150px] sm:text-base sm:leading-7">
          {content}
        </div>
      </div>
    </section>
  );
}
