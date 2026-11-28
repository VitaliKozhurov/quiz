import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../domain/user.entity';

import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../application/ports/users.repository';
import { isUniqueViolation } from 'src/core/db/typeorm';
import { isKeyOf } from 'src/core/utils/predicates';
import { USER_UNIQUE_CONSTRAINTS_EXTENSIONS } from 'src/modules/users/domain/constraints';
import { DomainException, DomainExceptionCode } from 'src/core/exceptions';

@Injectable()
export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    try {
      return await this.usersRepo.save(user);
    } catch (error) {
      if (isUniqueViolation(error)) {
        const constraint = error.driverError.constraint;

        if (!isKeyOf(USER_UNIQUE_CONSTRAINTS_EXTENSIONS, constraint)) {
          throw error;
        }

        const extension = USER_UNIQUE_CONSTRAINTS_EXTENSIONS[constraint];

        throw new DomainException({
          code: DomainExceptionCode.BAD_REQUEST_ERROR,
          message: 'User with provided credentials already exists',
          extensions: [extension],
        });
      }
      throw error;
    }
  }
}
