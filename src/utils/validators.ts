import {FieldValidator} from 'final-form';

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const required: FieldValidator<string> = (value) =>
  value ? undefined : 'Required';

export const maxLength = (max: number): FieldValidator<string> => (value) =>
  value && value.length > max ? `Greater than ${max}` : undefined;

export const minLength = (min: number): FieldValidator<string> => (value) =>
  value && value.length < min ? `Less than ${min}` : undefined;

export const isEmail: FieldValidator<string> = (value) =>
  value && !EMAIL_REGEXP.test(value) ? 'Invalid email address' : undefined;

export const compose = (
  validators?: FieldValidator<string> | FieldValidator<string>[]
): FieldValidator<string> | undefined => {
  if (validators instanceof Array) {
    return (value) =>
      validators.reduce(
        (error, validator: FieldValidator<string>) =>
          error || validator(value, {}),
        undefined
      );
  }

  return validators;
};
