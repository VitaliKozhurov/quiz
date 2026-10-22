import { Query } from '@nestjs/cqrs';
import { UserEntity } from '../../../domain/user.entity';
import { UserSortBy } from 'src/modules/users/api/schemas/user-sort-by.enum';
import { SortDirection } from 'src/core/query';

type GetUsersParams = {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: UserSortBy;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};

export class GetUsersQuery extends Query<UserEntity> {
  constructor(public readonly params: GetUsersParams) {
    super();
  }
}
