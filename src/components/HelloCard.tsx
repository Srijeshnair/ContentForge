type HelloCardProps = {
  title: string;
  description: string;
};

export default function HelloCard({ title, description }: HelloCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-3 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
