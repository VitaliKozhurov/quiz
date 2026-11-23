import { PaginatedResult } from 'src/core/query';

export type UserListItemReadModel = {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
};

export type UsersListReadModel = PaginatedResult<UserListItemReadModel>;
