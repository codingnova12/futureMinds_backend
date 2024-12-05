import { Optional } from '@nestjs/common';
import {
  IsDecimal,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;
  @IsString()
  description:string
  @IsMongoId()
  author: string;
  @IsDecimal()
  price: number;
  @ValidateIf((o) => o.oldPrice)
  @Optional()
  @IsDecimal()
  oldPrice?: number;
}
