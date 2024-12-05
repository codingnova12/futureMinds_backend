import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class createStripeProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsMongoId()
  @IsNotEmpty()
  id: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];
}
