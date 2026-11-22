import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../domain/user.entity';
import {
  GetUsersParams,
  UsersListReadModel,
} from '../../../application/queries/get-users';

export class UsersQueryRepository {
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
      where.push({ login: ILike(`%${searchEmailTerm}%`) });
    }

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
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return {
      pagesCount: Math.ceil(result[1] / pageSize),
      page: pageNumber,
      pageSize,
      totalCount: result[1],
      items: result[0],
    };
  }
}

// export const getPaginationParams = ({ pageNumber, pageSize }: Args) => {
//   const offset = (pageNumber - 1) * pageSize;
//
//   return {
//     offset,
//     limit: pageSize,
//   };
// };
