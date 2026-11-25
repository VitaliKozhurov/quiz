import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {
  getUsersQuerySchema,
  type GetUsersQueryDto,
} from './schemas/get-users.schema';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '../application/queries/get-users';
import { UserApiMapper } from './mappers/users-api.mapper';
import { UseBasicAuth } from 'src/modules/auth/decorators';

@Controller('sa/users')
export class UsersController {
  constructor(
    private queryBas: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @UseBasicAuth()
  @Get()
  async findAll(
    @Query({ schema: getUsersQuerySchema }) query: GetUsersQueryDto,
  ) {
    const result = await this.queryBas.execute(new GetUsersQuery(query));

    return UserApiMapper.mapToViewList(result);
  }

  @Post()
  create(): string {
    return 'This action returns all cats';
  }

  @Delete()
  delete(): string {
    return 'This action returns all cats';
  }
}
