import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UsersRepository } from '../../../infrastructure/persistence';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private repository: UsersRepository) {}

  async execute(query: GetUsersQuery) {
    const result = await this.repository.findOneById(query.heroId);

    return 123;
  }
}
