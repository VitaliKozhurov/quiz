import { UserEntity } from '../../domain/user.entity';

export abstract class UsersRepository {
  abstract save(user: UserEntity): Promise<UserEntity>;
}
