import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  DomainHttpExceptionFilter,
  GlobalHttpExceptionFilter,
} from './core/exceptions';
import { CoreModule } from './core';
import { AppConfigModule } from './config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [AppConfigModule, CoreModule, DatabaseModule, UsersModule],
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
