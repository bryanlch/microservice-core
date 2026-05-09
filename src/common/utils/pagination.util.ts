import { PaginationMeta } from '../contracts/pagination.contract';

export const createPaginationMeta = (
  total: number,
  page: number,
  limit: number,
): PaginationMeta => {
  const lastPage = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    lastPage,
    hasNextPage: page < lastPage,
    hasPreviousPage: page > 1,
  };
};
