const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const required = (value: string): string | undefined => value ? undefined : 'Required';

export const maxLength = (max: number) => (value: string): string | undefined => (
  (value && value.length > max) ? `Greater than ${max}` : undefined
);

export const minLength = (min: number) => (value: string): string | undefined => (
  (value && value.length < min) ? `Less than ${min}` : undefined
);

export const isEmail = (value: string): string | undefined => (
  value && !EMAIL_REGEXP.test(value) ? 'Invalid email address' : undefined
);