import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { secondsToDate } from 'src/utils/stripe.utils';
import {
  Pagination,
  PaginationParams,
} from 'src/utils/decorators/pagination.decorator';
import Stripe from 'stripe';
import { PaginatedData } from 'src/utils/pagination.utils';
import { OrdersService } from 'src/orders/orders.service';
import { CoursesService } from 'src/courses/courses.service';
import { CreateCheckoutSessionDto } from './dto/createCheckoutSession.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private ordersService: OrdersService,
    private coursesService: CoursesService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('checkout-session')
  async checkoutSession(
    @Body() session: CreateCheckoutSessionDto,
    @Request() req,
  ) {
    const orderId = await this.ordersService.createOrder({
      orderId: uuidv4(),
      userId: '66f7fc566972341e49a87714',
      courses: session.sessionObjects.map((obj) => obj.courseId),
    });
    let stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    //replace coursesIds with PricesIds to implment it in checkoutSession
    for (let i = 0; i < session.sessionObjects.length; i++) {
      stripeLineItems.push({
        price: await this.coursesService.getPriceIdByCourseId(
          session.sessionObjects[i].courseId,
        ),
        quantity: session.sessionObjects[i].amount,
      });
    }
    return this.stripeService.checkoutSession(
      stripeLineItems,
      'payment',
      {
        userId: '66f7fc566972341e49a87714',
        orderId: orderId.orderId,
      },
      orderId.orderId,
    );
  }
  @Post('checkout-session/webhook')
  async checkoutSessionSuccess(@Body() event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session: Stripe.Checkout.Session = event.data.object;
      const metadata = session.metadata;
      const paymentIntent = await this.stripeService.getPaymentIntentById(session.payment_intent as string);
      const charge=await this.stripeService.getChargeById(paymentIntent.latest_charge as string)
      this.ordersService.updateOrderByOrderId(metadata.orderId, {
        amountSubtotal: session.amount_subtotal,
        paymentIntent: session.payment_intent as string,
        receiptUrl:charge.receipt_url,
        status: 'Success',
      });
    }
  }

  @Get('payments')
  async getAllPayments(
    @PaginationParams() pagination: Pagination,
  ): Promise<any> {
    let payments = await this.stripeService.getAllPayments(pagination);
    payments = payments as PaginatedData<Partial<Stripe.PaymentIntent>>;
    payments.docs = payments.docs.map((payment: any) => ({
      id: payment.id,
      currency: payment.currency,
      amount_received: payment.amount_received,
      created_at: secondsToDate(payment.created),
      status: payment.status,
    }));

    return payments;
  }
  @Get('payments/:id')
  async getPaymentById(@Param() params: any) {
    return await this.stripeService.getPaymentById(params.id);
  }
  @Get('payment-methods/:id')
  async getPaymentMethodById(@Param() params: any) {
    const paymentMethod = await this.stripeService.getPaymentMethodById(
      params.id,
    );
    return paymentMethod.billing_details;
  }
}
