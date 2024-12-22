import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { orderModel } from './entities/order.entity';
import mongoose from 'mongoose';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: orderModel,
  ) {}
  createOrder(
    createOrderDto: CreateOrderDto,
  ) {
    return this.orderModel.create(createOrderDto);
  }
  async updateOrderByOrderId(orderId: string, updateQuery: Partial<UpdateOrderDto>) {
    await this.orderModel.findOneAndUpdate({orderId:orderId}, updateQuery);
  }
  getOrderById(orderId: string) {
    return this.orderModel.findOne({ orderId: orderId });
  }
  getOrderIdByPaymentIntent(paymentIntent: string): Promise<string> {
    return this.orderModel
      .findOne({ paymentIntent: paymentIntent })
      .select('orderId -_id')
      .then((res) => res.orderId);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
