import { INestApplication, ValidationPipe } from '@nestjs/common';
import { BadRequestDomainException } from 'src/core/exceptions';
import { formatValidationErrors } from 'src/core/validation';

export const setupPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const extensions = formatValidationErrors(errors);

        return new BadRequestDomainException(extensions);
      },
    }),
  );
};
