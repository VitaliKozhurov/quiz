import { Module } from '@nestjs/common';
import { GetUsersQueryHandler } from './application/queries/get-users/get-users.query-handler';
import { UsersController } from './api/users.controller';
import { UserEntity } from './domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUsersQueryRepository } from './infrastructure/persistence';
import { UserAccountTokenEntity } from './domain/user-account-token.entity';
import { UsersQueryRepository } from './application/ports/users.query-repository';
import { AuthModule } from '../auth/auth.module';
import { CreateUserUseCase } from './application/commands/create-user';

const queryHandlers = [GetUsersQueryHandler];
const commandHandlers = [CreateUserUseCase];

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserAccountTokenEntity,
      // UserConfirmationEntity,
      // UserPasswordRecoveryEntity,
      // UserDeviceSessionEntity,
    ]),
    // CryptoModule,
    // JwtModule,
    // ThrottlerModule.forRoot({ throttlers: [{ ttl: 10000, limit: 5 }] }),
    // NotificationsModule,
  ],
  controllers: [UsersController],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    { provide: UsersQueryRepository, useClass: TypeOrmUsersQueryRepository },
  ],
  exports: [],
})
export class UsersModule {}
