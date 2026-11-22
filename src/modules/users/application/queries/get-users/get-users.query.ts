import { Query } from '@nestjs/cqrs';
import { UserSortBy } from '../../../api/schemas/user-sort-by.enum';
import { SortDirection } from 'src/core/query';
import { UsersListReadModel } from './get-users.read-model';

export type GetUsersParams = {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: UserSortBy;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};

export class GetUsersQuery extends Query<UsersListReadModel> {
  constructor(public readonly params: GetUsersParams) {
    super();
  }
}
