import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { HTTP_METHOD } from '../../enums/http-method.enum';

const routerPathPassAuth = [
  // {
  //   path: '/api/bookings',
  //   method: HTTP_METHOD.GET,
  // },
];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const route: string = request.route.path;
    const method = request.method;

    const bearerToken = request.headers.authorization?.trim();

    if (
      routerPathPassAuth.some((r) => r.path === route && r.method === method) &&
      !bearerToken
    ) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
