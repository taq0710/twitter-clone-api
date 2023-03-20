import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadGatewayException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from 'src/core/interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (
          Array.isArray(data) &&
          data.length === 2 &&
          data[0].constructor.name !== data[1].constructor.name &&
          typeof data[1] === 'number'
        ) {
          return {
            data: instanceToPlain(data[0]),
            message: data[0]?.message,
            statusCode: context.switchToHttp().getResponse().statusCode,
            count: data[1],
          };
        }

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: data?.success,
          message: data?.message,
          // message: data?.message,
          // data: data,
          data: data?.data,
        };
      }),
      catchError((err) => {
        return throwError(
          () => new BadGatewayException(err.response || err.message || err),
        );
      }),
    );
  }
}
