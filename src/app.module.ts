import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerModule } from './seller/seller.module';
import { CoursesModule } from './courses/courses.module';
import { AppConfigService } from './infrastructure/configration/appConfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigrationModule } from './infrastructure/configration/configration.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { CloudinaryService } from './shared/services/cloudinary/cloudinary.service';
import { StripeModule } from './payments/stripe/stripe.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { InstructorsModule } from './instructors/instructors.module';
import { OrdersModule } from './orders/orders.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    ExceptionsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_HOST'),
        dbName: 'benova',
      }),

      inject: [ConfigService],
    }),
   
    SellerModule,
    CoursesModule,
    StripeModule,
    ConfigrationModule,
    DashboardModule,
    AuthModule,
    InstructorsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService, CloudinaryService],
})
export class AppModule {}
