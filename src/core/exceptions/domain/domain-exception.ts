import { ErrorExtension } from '../../validation/format-validation-errors';
import { DomainExceptionCode } from './domain-exception.types';

export class DomainException extends Error {
  readonly message: string;
  readonly code: DomainExceptionCode;
  readonly extensions: ErrorExtension[];

  constructor(errorInfo: {
    code: DomainExceptionCode;
    message: string;
    extensions?: ErrorExtension[];
  }) {
    super(errorInfo.message);
    this.message = errorInfo.message;
    this.code = errorInfo.code;
    this.extensions = errorInfo.extensions ?? [];
  }
}
