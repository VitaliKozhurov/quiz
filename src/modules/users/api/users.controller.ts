import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {
  getUsersQuerySchema,
  type GetUsersQueryDto,
} from './schemas/get-users.schema';
import { CommandBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '../application/queries/get-users';

@Controller('sa/users')
export class UsersController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  findAll(@Query({ schema: getUsersQuerySchema }) query: GetUsersQueryDto) {
    return this.commandBus.execute(new GetUsersQuery(query));
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
