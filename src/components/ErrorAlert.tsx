import { ReactNode } from 'react';

export type AlertType = 'error' | 'warning' | 'success' | 'info';

interface ErrorAlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onDismiss?: () => void;
  isDismissible?: boolean;
  icon?: ReactNode;
}

const typeStyles: Record<AlertType, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: 'bg-rose-950/40',
    border: 'border-rose-500',
    text: 'text-rose-200',
    icon: '✕',
  },
  warning: {
    bg: 'bg-amber-950/40',
    border: 'border-amber-500',
    text: 'text-amber-200',
    icon: '⚠',
  },
  success: {
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500',
    text: 'text-emerald-200',
    icon: '✓',
  },
  info: {
    bg: 'bg-blue-950/40',
    border: 'border-blue-500',
    text: 'text-blue-200',
    icon: 'ℹ',
  },
};

export default function ErrorAlert({
  type = 'error',
  title,
  message,
  onDismiss,
  isDismissible = true,
  icon,
}: ErrorAlertProps) {
  const styles = typeStyles[type];

  return (
    <div className={`rounded-lg border ${styles.border} ${styles.bg} px-4 py-3 shadow-sm shadow-${type}-900/20 animate-in fade-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 text-lg font-semibold ${styles.text}`}>
          {icon || styles.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-sm font-semibold ${styles.text} mb-1`}>
              {title}
            </h3>
          )}
          <p className={`text-sm ${styles.text}`}>
            {message}
          </p>
        </div>
        {isDismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 text-lg font-semibold ${styles.text} hover:opacity-75 transition-opacity focus:outline-none`}
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
