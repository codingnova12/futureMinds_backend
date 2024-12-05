import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { StripeService } from 'src/payments/stripe/stripe.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService,StripeService],
})
export class DashboardModule {}
