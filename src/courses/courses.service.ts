import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Model } from 'mongoose';
import { Course, courseModel } from './entities/course.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: courseModel,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  findAll() {
    return this.courseModel.find({});
  }

  findOne(id: string) {
    return this.courseModel.findById(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
