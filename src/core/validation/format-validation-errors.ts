import type { ValidationError } from 'class-validator';

export type ErrorExtension = { field: string; message: string };

export const formatValidationErrors = (
  errors: ValidationError[],
  parentErrorField: string = '',
): ErrorExtension[] => {
  const result: ErrorExtension[] = [];

  for (const error of errors) {
    const field = parentErrorField
      ? `${parentErrorField}/${error.property}`
      : error.property;

    if (error.constraints) {
      const constraints = Object.values(error.constraints);

      for (const message of constraints) {
        result.push({ field, message });
      }
    }

    if (error.children && error.children.length > 0) {
      result.push(...formatValidationErrors(error.children, field));
    }
  }

  return result;
};
