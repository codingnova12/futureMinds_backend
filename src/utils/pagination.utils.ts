import { Pagination } from './decorators/pagination.decorator';

export class PaginatedData<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  //current page number
  page: number;
  totalPages: number;
  offset?: number;
  prevPage: number;
  nextPage: number;
}
export function paginatedData<T>(
  data: T[],
  pagination: Pagination,
): PaginatedData<T> {
  const { page, limit } = pagination;
  const totalPages = Math.ceil(data.length / limit);
  const docs=getPaginatedData(data,page,limit)
  const paginateddata: PaginatedData<T> = {
    docs: docs,
    totalDocs: data.length,
    limit: pagination.limit,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    page: page,
    totalPages: totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
  return paginateddata;
}
function getPaginatedData<T>(data: T[],page: number,limit: number) {
  const pagesToSkip = page - 1
  return data.slice(pagesToSkip * limit, pagesToSkip * limit + limit)
}
