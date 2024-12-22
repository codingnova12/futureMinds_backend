import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { instructorSchema } from './entities/instructor.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }])],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
