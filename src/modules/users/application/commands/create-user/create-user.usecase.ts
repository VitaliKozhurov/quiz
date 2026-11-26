import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CerateUserResult, CreateUserCommand } from './create-user.command';
// import { DomainException, DomainExceptionCode } from 'src/core/exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(private usersFactory: UsersFactory) {}

  async execute({ body }: CreateUserCommand): Promise<CerateUserResult> {
    try {
      const newUser = await this.usersFactory.createVerifiedUser(dto);

      return newUser;
    } catch (error) {
      //       if (isUniqueEntityError(error)) {
      //         const constraint = error.driverError
      //           .constraint as keyof typeof USER_UNIQUE_CONSTRAINTS;
      //
      //         if (!USER_UNIQUE_CONSTRAINTS[constraint]) {
      //           throw error;
      //         }
      //
      //         throw new DomainException({
      //           code: DomainExceptionCode.BAD_REQUEST_ERROR,
      //           message: 'User with provided credentials already exists',
      //           extensions: [USER_UNIQUE_CONSTRAINTS[constraint]],
      //         });
      //       }
      //
      //       throw error;
      //     }
    }
  }
}
