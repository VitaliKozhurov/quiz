import { GetUsersParams, UsersListReadModel } from '../queries/get-users';

export abstract class UsersQueryRepository {
  abstract findAll(params: GetUsersParams): Promise<UsersListReadModel>;
}
