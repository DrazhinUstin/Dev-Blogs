'use client';

import { useFormStatus } from 'react-dom';

export default function FormSubmitBtn({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button {...props} type='submit' disabled={props.disabled || pending}>
      {children}
    </button>
  );
}
