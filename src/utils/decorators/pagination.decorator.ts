import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface Pagination {
  page: number;
  limit: number;
  offset?: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    if (!req.query.page || !req.query.limit) return null;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    // check if page and size are valid
    if (isNaN(page) || isNaN(limit)) {
      throw new BadRequestException('Invalid pagination params');
    }
    // do not allow to fetch large slices of the dataset
    if (limit > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }

    // calculate pagination parameters
    const offset = page * limit;
    return { page, limit, offset };
  },
);
