import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createStripeProductDto } from './dto/createProduct.dto';
import Stripe from 'stripe';
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
  checkoutSession(data) {
    return this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QO0A4GbIeKO7qfdqkITTLls',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: this.configService.get<string>('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL'),
    });
  }
  public async getAllPayments(): Promise<Stripe.PaymentIntent[]> {
    const payments = (await this.stripe.paymentIntents.list()).data;
    return payments;
  }
  public async getLastestPayment(): Promise<Stripe.PaymentIntent> {
    const payments = await this.stripe.paymentIntents.list();
    return payments.data[payments.data.length - 1];
  }
  private createProductPrice(productId: string, unitAmount: number) {
    return this.stripe.prices.create({
      currency: 'usd',
      unit_amount: unitAmount,
      product: productId,
    });
  }
}
