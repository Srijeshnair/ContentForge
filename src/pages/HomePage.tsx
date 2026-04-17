import HelloCard from '../components/HelloCard';
import { formatTitle } from '../utilities/format';
import useToggle from '../hooks/useToggle';

export default function HomePage() {
  const [isActive, toggleActive] = useToggle(false);
  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl flex-col px-6 py-10 sm:px-8 lg:px-12">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-slate-50 shadow-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">ContentForge</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">{formatTitle('Build content faster')}.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            A clean, scalable starter for React + Vite with Tailwind CSS and modular app structure.
          </p>
          <button
            type="button"
            onClick={toggleActive}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            {isActive ? 'Active mode enabled' : 'Enable active mode'}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <HelloCard title="Components" description="Reusable UI pieces for cards, buttons, forms, and shared widgets." />
          <HelloCard title="Pages" description="View-level pages with routing-ready layouts and page composition." />
          <HelloCard title="Layouts" description="Application shell and content wrappers for consistent page structure." />
          <HelloCard title="Services" description="API clients, data adapters, and integration helpers in one place." />
        </div>
      </section>
    </main>
  );
}
