import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreConfig } from './config';

@Global()
@Module({
  imports: [CqrsModule],
  // CoreConfig дает всему приложению один валидированный и типизированный доступ
  // к env-настройкам. Пример использования в сервисе:
  // constructor(private readonly coreConfig: CoreConfig) {}
  // const port = this.coreConfig.port;
  exports: [CoreConfig, CqrsModule],
  providers: [CoreConfig],
})
export class CoreModule {}
