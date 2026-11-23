import { GetUsersParams } from './get-users.query';
import { UsersListReadModel } from './get-users.read-model';

export abstract class UsersQueryRepository {
  abstract findAll(params: GetUsersParams): Promise<UsersListReadModel>;
}
