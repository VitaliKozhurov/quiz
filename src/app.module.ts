import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { appConfigModule } from './config/app-config.module';
import { CoreModule } from './core/core.module';
import { DomainHttpExceptionFilter } from './core/exceptions';

@Module({
  imports: [appConfigModule, CoreModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionFilter,
    }, // Порядок важен, сначала обрабатываются доменные ошибки
  ],
})
export class AppModule {}
