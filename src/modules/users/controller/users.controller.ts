import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { getUsersSchema, type GetUsersQuery } from './schemas/get-users.schema';

@Controller('sa/users')
export class UsersController {
  @Get()
  findAll(@Query({ schema: getUsersSchema }) query: GetUsersQuery): string {
    console.log(query);

    return 'This action returns all cats';
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
