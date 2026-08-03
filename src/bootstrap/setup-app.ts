import { INestApplication } from '@nestjs/common';
import { setupGlobalPrefix } from './setup-global-prefix';
import { setupPipes } from './setup-pipes';

export const setupApp = (app: INestApplication) => {
  setupPipes(app);
  setupGlobalPrefix(app);
};
