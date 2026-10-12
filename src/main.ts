import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './bootstrap/setup-app';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);

  const appConfig = app.get(AppConfigService);

  await app.listen(appConfig.port, () => {
    console.log('✅ Nest App was started!');
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
