import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('sa/users')
// @UseBasicGuard()
export class UsersController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getUsers(@Query() query: GetUsersQueryDto) {
    const result = await this.queryBus.execute(new GetUsersQuery(query));

    return result;
  }

  @Post()
  async createUser(@Body() dto: CreateUserRequestDto) {
    const createdUser = await this.commandBus.execute(
      new CreateUserCommand(dto),
    );

    return createdUser;
  }

  @Delete(':id')
  async delete(@Param('id', UUIDValidationPipe) id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
