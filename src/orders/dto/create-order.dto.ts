import { Optional } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
  @IsArray()
  @ArrayNotEmpty()
  courses: string[];
  @IsString()
  @Optional()
  paymentIntent?: string;
  @IsNumber()
  @Optional()
  amountSubtotal?: number;
}
