import { useState } from 'react';

type OutputCardProps = {
  content: string;
  label?: string;
  onRegenerate: () => void;
};

export default function OutputCard({ content, label = 'Generated Content', onRegenerate }: OutputCardProps) {
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
    <section className="mt-8 rounded-2xl border border-slate-700 bg-card p-6 shadow-2xl shadow-slate-900/30 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Output</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">{label}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Review the content below, copy it instantly, or regenerate a fresh version with one click.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
          >
            {copyStatus === 'copied' ? 'Copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
          >
            Regenerate
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-slate-100 shadow-inner sm:p-8">
        <div className="min-h-[150px] whitespace-pre-wrap break-words text-sm leading-7 sm:text-base">
          {content}
        </div>
      </div>
    </section>
  );
}
