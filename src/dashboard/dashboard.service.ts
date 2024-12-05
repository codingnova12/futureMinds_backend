import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { StripeService } from 'src/payments/stripe/stripe.service';
import { IPaymentIntent } from 'src/payments/stripe/dto/getPaymentsResponse.dto';
import Stripe from 'stripe';

@Injectable()
export class DashboardService {
  constructor(private readonly stripeService: StripeService){}
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  public async getHomeData(): Promise<{lastTransaction:Stripe.PaymentIntent}> {
    const [lastTransaction] = await Promise.all([
      this.stripeService.getLastestPayment()
    ])
    return {lastTransaction}
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
