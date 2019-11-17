export const required = (value) => value ? undefined : 'Required';

export const maxLength = (max) => (value) =>
  (value && value.length > max) ? `Greater than ${max}` : undefined;

export const minLength = (min) => (value) =>
  (value && value.length < min) ? `Less than ${min}` : undefined;

export const isEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined;