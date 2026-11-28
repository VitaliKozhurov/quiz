import { QueryFailedError } from 'typeorm';
import { POSTGRES_INTEGRITY_ERRORS } from '../postgres-error-codes';

type DriverError = {
  driverError: {
    code: string;
    constraint: string;
  };
};

export const isUniqueViolation = (error: unknown): error is DriverError => {
  if (!(error instanceof QueryFailedError)) {
    return false;
  }

  const driverError: unknown = error.driverError;

  if (
    typeof driverError === 'object' &&
    driverError !== null &&
    'code' in driverError &&
    driverError.code === POSTGRES_INTEGRITY_ERRORS.UNIQUE_VIOLATION &&
    'constraint' in driverError &&
    typeof driverError.constraint === 'string'
  ) {
    return true;
  }

  return false;
};
