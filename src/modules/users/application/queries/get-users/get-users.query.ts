import { Query } from '@nestjs/cqrs';
import { PaginationParams, SortDirection } from 'src/core/query';
import { UsersListReadModel } from './get-users.read-model';

export enum UserSortBy {
  Login = 'login',
  Email = 'email',
  CreatedAt = 'createdAt',
}

export type GetUsersParams = {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: UserSortBy;
  sortDirection: SortDirection;
} & PaginationParams;

export class GetUsersQuery extends Query<UsersListReadModel> {
  constructor(public readonly params: GetUsersParams) {
    super();
  }
}
