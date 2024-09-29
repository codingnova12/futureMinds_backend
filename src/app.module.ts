import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerModule } from './seller/seller.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb://mongo:ncZzqTRHKmYsOAZvKXJkGDRBgkdMvDjT@autorack.proxy.rlwy.net:12535',
      { dbName: 'benova' },
    ),
    SellerModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
