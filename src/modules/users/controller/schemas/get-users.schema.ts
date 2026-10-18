import { paginationQuerySchema } from 'src/core/query';
import z from 'zod';
import { UserSortBy } from './user-sort-by.enum';

export const getUsersSchema = paginationQuerySchema.extend({
  searchLoginTerm: z.string().optional(),
  searchEmailTerm: z.string().optional(),
  sortBy: z.enum(UserSortBy).default(UserSortBy.CreatedAt),
});

export type GetUsersQuery = z.infer<typeof getUsersSchema>;
