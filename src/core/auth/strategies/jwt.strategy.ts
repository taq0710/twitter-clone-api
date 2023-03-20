import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.KEY_SECRET_JWT,
    });
  }

  authenticate(req, options) {
    if (req.handshake) {
      req.headers = req.headers || {};
      req.headers.authorization = `Bearer ${req.handshake?.query?.token}`;
    }
    super.authenticate(req, options);
  }

  async validate(payload: any): Promise<any> {
    const { uid, role } = payload;

    return { id: uid, role: role } as any;
  }
}
