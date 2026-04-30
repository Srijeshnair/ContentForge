interface FieldErrorProps {
  error?: string | null;
  className?: string;
}

export default function FieldError({ error, className = '' }: FieldErrorProps) {
  if (!error) return null;

  return (
    <p className={`mt-1.5 text-xs text-rose-400 flex items-center gap-1 animate-in fade-in duration-200 ${className}`}>
      <span className="font-semibold">•</span>
      {error}
    </p>
  );
}
