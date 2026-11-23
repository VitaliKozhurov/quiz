import { PaginatedResult } from 'src/core/query';
import {
  UserListItemReadModel,
  UsersListReadModel,
} from '../../application/queries/get-users/get-users.read-model';

export type UserView = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type UsersListView = PaginatedResult<UserView>;

export class UserApiMapper {
  static mapToView({
    id,
    login,
    email,
    createdAt,
  }: UserListItemReadModel): UserView {
    return { id, login, email, createdAt: createdAt.toISOString() };
  }

  static mapToViewList(data: UsersListReadModel): UsersListView {
    return {
      ...data,
      items: data.items.map((item) => this.mapToView(item)),
    };
  }
}
