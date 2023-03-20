import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../core/auth/guards/roles/roles.guard';
import { JwtStrategy } from '../../core/auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.KEY_SECRET_JWT,
        signOptions: {
          expiresIn: process.env.EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [JwtAuthGuard, RolesGuard, JwtStrategy, JwtService],
})
export class AuthModule {}
