import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { isString } from 'class-validator';

export class UpdateOrderDto {
  paymentIntent: string;
    amountSubtotal: number;
    status: string;
    receiptUrl:string
}
