import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/bcrypt.utils';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
 async create(user: CreateUserDto) {
   const userExists = await this.findUserByEmail(user.email);
   if (userExists) throw new BadRequestException('User already exists');
    user.password=await hashPassword(user.password);
    const newuser = new this.userModel(user);
    return newuser.save();
  }
  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }
  findUserById(userId:string) {
    return this.userModel.findById(userId)
  }
  findAll() {
    return this.userModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
