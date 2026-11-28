import { Command } from '@nestjs/cqrs';

export type CreateUserCommandInput = {
  login: string;
  email: string;
  password: string;
};

export type CreateUserReadModel = {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
};

export class CreateUserCommand extends Command<CreateUserReadModel> {
  constructor(public input: CreateUserCommandInput) {
    super();
  }
}
