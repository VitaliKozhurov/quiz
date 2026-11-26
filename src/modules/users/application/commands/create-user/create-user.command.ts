import { Command } from '@nestjs/cqrs';

export type CreateUserBody = {
  login: string;
  email: string;
  password: string;
};

export type CerateUserResult = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export class CreateUserCommand extends Command<CerateUserResult> {
  constructor(public body: CreateUserBody) {
    super();
  }
}
