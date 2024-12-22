import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { instructorModel } from './entities/instructor.entity';
import { hashPassword } from 'src/utils/bcrypt.utils';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectModel('Instructor')
    private readonly instructorModel: instructorModel,
  ) {}
  async create(createInstructorDto: CreateInstructorDto) {
    const instructor = {
      firstName: createInstructorDto.firstName,
      lastName: createInstructorDto.lastName,
      email: createInstructorDto.email,
      password_hash:await hashPassword(createInstructorDto.password),
    };
    await this.instructorModel.create(instructor);
  }

  findAll() {
    return `This action returns all instructors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instructor`;
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
