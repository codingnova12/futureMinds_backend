import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellersSchema } from './entities/seller.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellersSchema }]),
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
