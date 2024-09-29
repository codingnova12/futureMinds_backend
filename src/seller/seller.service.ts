import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(@InjectModel("Seller") private readonly sellerModel: Model<Seller>) {}
  create(createSellerDto: CreateSellerDto) {
    return 'This action adds a new seller';
  }

  findAll() {
    return this.sellerModel.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
