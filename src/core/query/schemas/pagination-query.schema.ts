import z from 'zod';
import { SortDirection } from '../enums/sort-direction.enum';

export const paginationQuerySchema = z.object({
  sortDirection: z.enum(SortDirection).default(SortDirection.DESC),
  pageNumber: z.number().default(1),
  pageSize: z.number().default(10),
});
