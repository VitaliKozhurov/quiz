import { PaginationParams } from '../types/pagination-params.types';

export const toTypeOrmPaginationOptions = ({
  pageNumber,
  pageSize,
}: PaginationParams) => {
  const skip = (pageNumber - 1) * pageSize;

  return {
    skip,
    take: pageSize,
  };
};
