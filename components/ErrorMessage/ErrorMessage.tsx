import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={css.container}>
      <div className={css.icon}>⚠️</div>
      <h3 className={css.title}>Something went wrong</h3>
      <p className={css.message}>{message}</p>
      {onRetry && (
        <button className={css.retryButton} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
