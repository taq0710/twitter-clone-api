import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fisrtName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  birthDay: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  gender: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workPlace: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  street: string;
}
