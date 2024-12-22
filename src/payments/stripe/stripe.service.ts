import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createStripeProductDto } from './dto/createProduct.dto';
import Stripe from 'stripe';
import { Pagination } from 'src/utils/decorators/pagination.decorator';
import { PaginatedData, paginatedData } from 'src/utils/pagination.utils';
@Injectable()
export class StripeService implements OnModuleInit {
  private stripe: Stripe;
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    //stripe configuration
    this.stripe = require('stripe')(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
  }
  createProduct(
    product: createStripeProductDto,
  ): Promise<{ productPriceId: string }> {
    const { price, ...stripeProduct } = product;
    return new Promise((resolve, reject) => {
      this.stripe.products
        .create(stripeProduct)
        .then(() => {
          this.createProductPrice(product.id, price)
            .then((res) => {
              resolve({ productPriceId: res.id });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  checkoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    mode: Stripe.Checkout.SessionCreateParams.Mode,
    metadata: Stripe.MetadataParam,
    orderId: string,
  ) {
    return this.stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: mode,
      metadata: metadata,
      success_url:
        this.configService.get<string>('STRIPE_SUCCESS_URL') + orderId,
      cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL') + orderId,
    });
  }
  getChargeById(chargeId: string): Promise<Stripe.Charge | null> {
    return this.stripe.charges.retrieve(chargeId);
  }
  public async getAllPayments(
    pagination: Pagination,
  ): Promise<
    | PaginatedData<Partial<Stripe.PaymentIntent>>
    | Partial<Stripe.PaymentIntent>[]
  > {
    const payments = (await this.stripe.paymentIntents.list()).data;
    const paginatedPayments = paginatedData<Stripe.PaymentIntent>(
      payments,
      pagination ?? { page: 1, limit: 5 },
    );
    return paginatedPayments;
  }
  public getPaymentIntentById(
    id: string,
  ): Promise<Stripe.PaymentIntent | null> {
    return this.stripe.paymentIntents.retrieve(id);
  }
  public async getPaymentById(id: string): Promise<Stripe.PaymentIntent> {
    return (await this.stripe.paymentIntents.list()).data.find(
      (payment) => payment.id === id,
    );
  }
  public async getLastestPayment(): Promise<Stripe.PaymentIntent> {
    const payments = await this.stripe.paymentIntents.list();
    return payments.data[payments.data.length - 1];
  }
  public async getPaymentMethodById(id: string): Promise<Stripe.PaymentMethod> {
    return await this.stripe.paymentMethods.retrieve(id);
  }
  private createProductPrice(productId: string, unitAmount: number) {
    return this.stripe.prices.create({
      currency: 'usd',
      unit_amount: unitAmount,
      product: productId,
    });
  }
}
