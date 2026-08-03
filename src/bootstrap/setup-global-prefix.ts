import { INestApplication } from '@nestjs/common';

export const setupGlobalPrefix = (app: INestApplication) => {
  app.setGlobalPrefix('api');
};
