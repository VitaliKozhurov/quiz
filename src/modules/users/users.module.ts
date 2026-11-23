import { Module } from '@nestjs/common';
import { GetUsersQueryHandler } from './application/queries/get-users/get-users.query-handler';
import { UsersController } from './api/users.controller';
import { UserEntity } from './domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUsersQueryRepository } from './infrastructure/persistence';
import { UsersQueryRepository } from './application/queries/get-users';
import { UserAccountTokenEntity } from './domain/user-account-token.entity';

const queryHandlers = [GetUsersQueryHandler];

@Module({
  imports: [
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
    { provide: UsersQueryRepository, useClass: TypeOrmUsersQueryRepository },
  ],
  exports: [],
})
export class UsersModule {}
