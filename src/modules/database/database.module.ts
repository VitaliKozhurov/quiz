import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService, NodeEnv } from 'src/config';
import {
  DATABASE_LOGGER,
  DatabaseHealthCheck,
} from './service/db-health-check.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: 'localhost',
        port: configService.postgresPort,
        username: configService.postgresUser,
        password: configService.postgresPassword,
        database: configService.postgresDB,
        schema: 'public',
        autoLoadEntities: true,
        synchronize: configService.env === NodeEnv.DEVELOPMENT,
        logging: configService.env === NodeEnv.DEVELOPMENT,
        migrations: ['migrations/*.ts'],
        entities: ['src/**/*.entity.ts'],
        verboseRetryLog: true,
        retryAttempts: 3,
        retryDelay: 3_000,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: DATABASE_LOGGER,
      useFactory: () => new Logger('Postgres Database'),
    },
    DatabaseHealthCheck,
  ],
})
export class DatabaseModule {}
