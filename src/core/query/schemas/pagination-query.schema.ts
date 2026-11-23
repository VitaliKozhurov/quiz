import z from 'zod';
import { SortDirection } from '../enums/sort-direction.enum';

export const paginationQuerySchema = z.object({
  sortDirection: z.enum(SortDirection).default(SortDirection.DESC),
  pageNumber: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).default(10),
});
