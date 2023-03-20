import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class hashTagDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  hashtag: string;
}
