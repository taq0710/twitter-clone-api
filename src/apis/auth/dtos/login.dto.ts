import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CmsAuth } from 'src/core/auth/decorators/auth/cms-auth.decorators';

export class LoginDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @CmsAuth()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @CmsAuth()
  password: string;
}
