import { ConfigModule } from '@nestjs/config';

// Файлы в начале списка имеют больший приоритет и переопределяют значения
// из следующих файлов: ENV_FILE_PATH -> .env.<NODE_ENV>.local -> .env.<NODE_ENV> -> .env.production.
export const appConfigModule = ConfigModule.forRoot({
  envFilePath: [
    process.env.ENV_FILE_PATH?.trim() || '',
    `.env.${process.env.NODE_ENV}.local`,
    `.env.${process.env.NODE_ENV}`,
    '.env.production',
  ],
  isGlobal: true,
});
