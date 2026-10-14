import { Module } from '@nestjs/common';

@Module({
  imports: [
    // TypeOrmModule.forFeature([
    //   UserEntity,
    //   UserConfirmationEntity,
    //   UserPasswordRecoveryEntity,
    //   UserDeviceSessionEntity,
    // ]),
    // CryptoModule,
    // JwtModule,
    // ThrottlerModule.forRoot({ throttlers: [{ ttl: 10000, limit: 5 }] }),
    // NotificationsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
