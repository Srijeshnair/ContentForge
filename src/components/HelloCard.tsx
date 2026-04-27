type HelloCardProps = {
  title: string;
  description: string;
};

export default function HelloCard({ title, description }: HelloCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-card p-4 shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/30 hover:border-slate-600 sm:p-6">
      <h2 className="mb-2 text-xl font-semibold text-slate-100 sm:mb-3 sm:text-2xl">{title}</h2>
      <p className="text-sm text-slate-300 leading-relaxed sm:text-base">{description}</p>
    </div>
  );
}
