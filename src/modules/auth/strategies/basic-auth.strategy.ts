import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { DomainException, DomainExceptionCode } from 'src/core/exceptions';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(
  BasicStrategy,
  'basic',
) {
  private readonly validUsername = 'admin';
  private readonly validPassword = 'qwerty';

  constructor() {
    super();
  }

  validate(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      return true;
    }

    throw new DomainException({
      code: DomainExceptionCode.UNAUTHORIZED_ERROR,
      message: 'Authorization error',
    });
  }
}
