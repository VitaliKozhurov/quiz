import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserReadModel, CreateUserCommand } from './create-user.command';
import { UsersRepository } from '../../ports/users.repository';
import { UserEntity } from '../../../domain/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ input }: CreateUserCommand): Promise<CreateUserReadModel> {
    const { user } = UserEntity.createVerifiedUser({
      login: input.login,
      email: input.email,
      passwordHash: '',
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
      login: savedUser.login,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    };
  }
}
