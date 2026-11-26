import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  getUsersQuerySchema,
  type GetUsersQueryDto,
} from './schemas/get-users.schema';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '../application/queries/get-users';
import { UserApiMapper } from './mappers/users-api.mapper';
import { UseBasicAuth } from 'src/modules/auth/decorators';
import {
  type CreateUserDto,
  createUserSchema,
} from './schemas/create-user.schema';
import { uuidParamSchema } from 'src/core/schemas';
import { CreateUserCommand } from '../application/commands/create-user';

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
  async create(@Body({ schema: createUserSchema }) body: CreateUserDto) {
    const result = await this.commandBus.execute(new CreateUserCommand(body));

    return result;
  }

  @Delete(':id')
  delete(@Param('id', { schema: uuidParamSchema }) id: string) {
    return 'This action returns all cats';
  }
}
