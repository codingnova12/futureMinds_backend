import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { getPaymentsResponsetDto } from './dto/getPaymentsResponse.dto';
import { secondsToDate } from 'src/utils/stripe.utils';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('checkout-session')
  checkoutSession(@Body() data) {
    return this.stripeService.checkoutSession(data);
  }
  @Get('payments')
  async getAllPayments(): Promise<getPaymentsResponsetDto> {
    const payments = await this.stripeService.getAllPayments();
    return {
      data: payments.map((payment) => ({
        id: payment.id,
        currency: payment.currency,
        amount_received: payment.amount_received,
        created_at: secondsToDate(payment.created),
        status: payment.status,
      })),
    };
  }
}
