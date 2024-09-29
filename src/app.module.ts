import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerModule } from './seller/seller.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UserModule, SellerModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
