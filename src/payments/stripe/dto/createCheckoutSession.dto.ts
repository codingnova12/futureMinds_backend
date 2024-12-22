import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
export class SessionObject {
  @IsMongoId()
  @IsNotEmpty()
  courseId: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount;
}
export class CreateCheckoutSessionDto {
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => SessionObject)
  @ArrayNotEmpty()
  sessionObjects: SessionObject[];
}
