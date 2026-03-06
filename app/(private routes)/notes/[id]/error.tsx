'use client'

type Props = {
  error: Error;
  reset: () => void;
};

function ErrorPage({error, reset}: Props) {
  return (
    <p>Could not fetch note details. {error.message}</p>
  )
}

export default ErrorPage;