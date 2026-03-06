import css from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className={css.container}>
      <div className={css.icon}>📝</div>
      <h3 className={css.title}>{title}</h3>
      {description && <p className={css.description}>{description}</p>}
      {action && (
        <button className={css.actionButton} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
