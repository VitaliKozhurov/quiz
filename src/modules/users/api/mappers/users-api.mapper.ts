import { PaginatedResult } from 'src/core/query';
import {
  UserItemReadModel,
  UsersListReadModel,
} from '../../application/queries/get-users/get-users.read-model';
import { CreateUserRequestDto } from '../schemas/create-user.schema';
import { CreateUserCommandInput } from '../../application/commands/create-user/create-user.command';

export type UserView = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type UsersListView = PaginatedResult<UserView>;

export class UserApiMapper {
  static toCreateUserCommandInput(
    dto: CreateUserRequestDto,
  ): CreateUserCommandInput {
    return {
      login: dto.login,
      email: dto.email,
      password: dto.password,
    };
  }

  static mapToView({
    id,
    login,
    email,
    createdAt,
  }: UserItemReadModel): UserView {
    return { id, login, email, createdAt: createdAt.toISOString() };
  }

  static mapToViewList(data: UsersListReadModel): UsersListView {
    return {
      ...data,
      items: data.items.map((item) => this.mapToView(item)),
    };
  }
}
