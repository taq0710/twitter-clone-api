import { ApiQuery } from '@nestjs/swagger';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationOptions } from './pagination.model';

export const Pagination = createParamDecorator(
  (data: unknown, context: ExecutionContext): PaginationOptions => {
    const request = context.switchToHttp().getRequest();
    // Whatever logic you want to parse params in request
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 20;
    return {
      limit: limit,
      skip: (page - 1) * limit,
      page,
    };
  },
  [
    (target: any, key: string) => {
      ApiQuery({
        name: 'page',
        schema: { default: 1, type: 'number', minimum: 1 },
        required: false,
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
      ApiQuery({
        name: 'limit',
        schema: { default: 20, type: 'number', minimum: 1 },
        required: false,
      })(target, key, Object.getOwnPropertyDescriptor(target, key));
    },
  ],
);
