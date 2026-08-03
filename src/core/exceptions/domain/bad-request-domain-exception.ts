import { ErrorExtension } from 'src/core/validation/format-validation-errors';
import { DomainException } from './domain-exception';
import { DomainExceptionCode } from './domain-exception.types';

export class BadRequestDomainException extends DomainException {
  constructor(extensions?: ErrorExtension[]) {
    super({
      code: DomainExceptionCode.VALIDATION_ERROR,
      message: 'Validation error',
      extensions,
    });
  }
}
