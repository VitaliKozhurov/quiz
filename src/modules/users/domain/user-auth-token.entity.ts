import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum AuthTokenPurpose {
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
}
@Entity('user_auth_tokens')
export class UserAuthTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AuthTokenPurpose })
  purpose: AuthTokenPurpose;

  @Column({ type: 'uuid' })
  code: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Column('uuid')
  userId: string;

  // Говорит TypeORM: много токенов может относиться к одному пользователю.
  // authTokens указывает на поле в UserEntity
  @ManyToOne(() => UserEntity, (user) => user.authTokens, {
    onDelete: 'CASCADE', // если физически удалить пользователя, БД автоматически удалит все его токены, но при softDelete не сработает
  })
  // Связывает свойство user с уже созданной колонкой userId
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
