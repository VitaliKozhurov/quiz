import { PaginatedResult } from 'src/core/query';

export type UserItemReadModel = {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
};

export type UsersListReadModel = PaginatedResult<UserItemReadModel>;
