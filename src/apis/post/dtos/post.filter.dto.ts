import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PostFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q: string;
}
