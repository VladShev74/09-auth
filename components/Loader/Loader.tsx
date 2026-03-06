import css from './Loader.module.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export default function Loader({ size = 'medium', message }: LoaderProps) {
  return (
    <div className={css.container}>
      <div className={`${css.spinner} ${css[size]}`}></div>
      {message && <p className={css.message}>{message}</p>}
    </div>
  );
}
