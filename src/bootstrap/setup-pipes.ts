import { INestApplication, StandardSchemaValidationPipe } from '@nestjs/common';
import { BadRequestDomainException } from 'src/core/exceptions';

export const setupPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new StandardSchemaValidationPipe({
      //  validateCustomDecorators: true, для валидации декораторов
      exceptionFactory: (errors) => {
        const errorsObject = errors.reduce<Record<string, string>>(
          (acc, curr) => {
            const field = curr.path?.map(String).join('/');
            if (!field || field in acc) {
              return acc;
            }

            acc[field] = curr.message;

            return acc;
          },
          {},
        );

        const result = Object.entries(errorsObject).map(([field, message]) => ({
          field,
          message,
        }));

        return new BadRequestDomainException(result);
      },
    }),
  );
};
