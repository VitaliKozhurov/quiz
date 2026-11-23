import { PaginationParams } from '../types/pagination-params.types';

export const createPaginatedResult = <T>({
  items,
  totalCount,
  paginatedParams,
}: {
  items: T[];
  totalCount: number;
  paginatedParams: PaginationParams;
}) => {
  return {
    pagesCount: Math.ceil(totalCount / paginatedParams.pageSize),
    page: paginatedParams.pageNumber,
    pageSize: paginatedParams.pageSize,
    totalCount,
    items,
  };
};
