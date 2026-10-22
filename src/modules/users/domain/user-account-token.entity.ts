import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum AccountTokenPurpose {
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
}
@Entity('user_account_tokens')
export class UserAccountTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AccountTokenPurpose })
  purpose: AccountTokenPurpose;

  @Column({ type: 'uuid' })
  code: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Column('uuid')
  userId: string;

  // Говорит TypeORM: много токенов может относиться к одному пользователю.
  // accountTokens указывает на поле в UserEntity
  @ManyToOne(() => UserEntity, (user) => user.accountTokens, {
    onDelete: 'CASCADE', // если физически удалить пользователя, БД автоматически удалит все его токены, но при softDelete не сработает
  })
  // Связывает свойство user с уже созданной колонкой userId
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
