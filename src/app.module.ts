import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainHttpExceptionFilter } from './core/exceptions';

@Module({
  imports: [],
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
