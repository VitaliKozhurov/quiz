import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  DomainHttpExceptionFilter,
  GlobalHttpExceptionFilter,
} from './core/exceptions';
import { CoreModule } from './core';
import { AppConfigModule } from './config';

@Module({
  imports: [AppConfigModule, CoreModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalHttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionFilter,
    }, // Порядок важен, сначала обрабатываются доменные ошибки
  ],
})
export class AppModule {}
