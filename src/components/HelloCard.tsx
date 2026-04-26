type HelloCardProps = {
  title: string;
  description: string;
};

export default function HelloCard({ title, description }: HelloCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-card p-6 shadow-lg shadow-slate-900/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/30">
      <h2 className="mb-3 text-2xl font-semibold text-slate-100">{title}</h2>
      <p className="text-slate-300">{description}</p>
    </div>
  );
}
