import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from './entities/course.entity';
import { SharedModule } from 'src/shared/shared.module';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { StripeModule } from 'src/payments/stripe/stripe.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
    SharedModule,
    ExceptionsModule,
    StripeModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
