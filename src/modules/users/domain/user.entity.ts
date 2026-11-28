import { randomUUID } from 'crypto';
import { BaseDbEntity } from 'src/core/db';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { CreateUserProps } from './dto/create-user.dto';
import {
  AccountTokenPurpose,
  UserAccountTokenEntity,
} from './user-account-token.entity';
import { USER_CONSTRAINTS } from './constraints';

@Entity({ name: 'users' })
@Unique(USER_CONSTRAINTS.LOGIN, ['login'])
@Unique(USER_CONSTRAINTS.EMAIL, ['email'])
export class UserEntity extends BaseDbEntity {
  @Column({ type: 'varchar', length: 50 })
  login: string;

  @Column({ type: 'varchar', length: 254 })
  email: string;

  @Column({ type: 'text' })
  passwordHash: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;

  // Это поле не создаёт колонку в users. Оно лишь позволяет TypeORM понимать связь и загружать токены пользователя.
  @OneToMany(() => UserAccountTokenEntity, (token) => token.user, {
    cascade: true,
  })
  accountTokens: UserAccountTokenEntity[];

  static createVerifiedUser(dto: CreateUserProps): { user: UserEntity } {
    const user = new UserEntity();

    user.login = dto.login;
    user.passwordHash = dto.passwordHash;
    user.email = dto.email;
    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();

    return { user };
  }

  static createUnverifiedUser(dto: CreateUserProps): {
    user: UserEntity;
    confirmationCode: string;
  } {
    const user = new UserEntity();

    user.login = dto.login;
    user.passwordHash = dto.passwordHash;
    user.email = dto.email;
    user.isEmailVerified = false;
    user.emailVerifiedAt = null;

    const token = new UserAccountTokenEntity();
    const confirmationCode = randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    token.purpose = AccountTokenPurpose.EMAIL_VERIFICATION;
    token.code = confirmationCode;
    token.expiresAt = expiresAt;
    token.user = user;

    user.accountTokens = [token];

    return { user, confirmationCode };
  }
}
