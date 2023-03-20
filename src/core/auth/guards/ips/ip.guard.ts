import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { includes, isEmpty } from 'lodash';

@Injectable()
export class IpGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ips = this.reflector
      .get<string[]>('ips', context.getHandler())
      .filter((item) => !!item);
    if (isEmpty(ips)) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    if (
      includes(
        ips.map((item) => item.trim()),
        ip,
      )
    ) {
      return true;
    } else {
      throw new ForbiddenException('Not allowed');
    }
  }
}
