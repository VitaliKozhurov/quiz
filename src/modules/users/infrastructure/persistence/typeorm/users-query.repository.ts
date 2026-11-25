import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../domain/user.entity';
import {
  GetUsersParams,
  UsersListReadModel,
} from '../../../application/queries/get-users';
import {
  createPaginatedResult,
  toTypeOrmPaginationOptions,
} from 'src/core/query';
import { Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../../application/ports/users.query-repository';

@Injectable()
export class TypeOrmUsersQueryRepository implements UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) {}

  async findAll(params: GetUsersParams): Promise<UsersListReadModel> {
    const {
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    } = params;

    const where: FindOptionsWhere<UserEntity>[] = [];

    if (searchLoginTerm) {
      where.push({ login: ILike(`%${searchLoginTerm}%`) });
    }

    if (searchEmailTerm) {
      where.push({ email: ILike(`%${searchEmailTerm}%`) });
    }

    const { skip, take } = toTypeOrmPaginationOptions({ pageNumber, pageSize });

    const result = await this.usersRepo.findAndCount({
      select: {
        id: true,
        login: true,
        email: true,
        createdAt: true,
      },
      where: where.length > 0 ? where : undefined,
      withDeleted: false,
      order: { [sortBy]: sortDirection },
      skip,
      take,
    });

    const paginatedResult = createPaginatedResult({
      items: result[0],
      totalCount: result[1],
      paginatedParams: { pageNumber, pageSize },
    });

    return paginatedResult;
  }
}
