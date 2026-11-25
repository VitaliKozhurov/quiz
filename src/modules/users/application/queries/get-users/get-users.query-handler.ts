import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UsersQueryRepository } from '../../ports/users.query-repository';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private repository: UsersQueryRepository) {}

  async execute({ params }: GetUsersQuery) {
    const result = await this.repository.findAll(params);

    return result;
  }
}
