import { Injectable } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import { courseModel, ICourse } from './entities/course.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/shared/services/cloudinary/cloudinary.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { StripeService } from 'src/payments/stripe/stripe.service';
import { createStripeProductDto } from 'src/payments/stripe/dto/createProduct.dto';
import mongoose from 'mongoose';
import { Express } from 'express';
import 'multer';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: courseModel,
    private readonly cloudinaryService: CloudinaryService,
    public exceptionsService: ExceptionsService,
    public stripeService: StripeService,
  ) {}
  async create(thumbnail: Express.Multer.File, course: CreateCourseDto) {
    try {
      //save in mongo first
      const { title, author, price, oldPrice } = course;
      const courseDoc = await this.courseModel.create({
        title: title,
        author: author,
        rating: 4.5,
        price: price,
        oldPrice: oldPrice,
      });
      //save thumbnail in cloudinary
      const thumbnailUpload = await this.cloudinaryService.upload(
        thumbnail,
        {
          folder: 'courses_thumbnails',
          public_id: courseDoc._id.toString() + '_thumbnail',
          resource_type: 'image',
        },
        function (err, res) {
          //if success save to stripe
          if (err) this.exceptionsService.throwException(err);

          return res;
        },
      );
      const stripeProduct: createStripeProductDto = {
        name: course.title,
        description: course.description,
        price: course.price,
        id: courseDoc._id.toString(),
        images: [thumbnailUpload.url],
      };

      const createdProduct =
        await this.stripeService.createProduct(stripeProduct);
      const updatedCourse = await this.updateCourse(courseDoc._id, {
        thumbnailLink: thumbnailUpload.url,
        stripeProductPriceId: createdProduct.productPriceId,
      });
      console.log(courseDoc._id);
    } catch (err) {
      this.exceptionsService.badRequestException(err);
    }
  }
  async updateCourse(
    courseId: mongoose.Types.ObjectId,
    query: Partial<ICourse>,
  ) {
    try {
      return await this.courseModel.updateOne(
        { _id: courseId.toString() },
        query,
      );
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.courseModel.find({});
  }
  searchCourses(keywords: string) {
    var regexQuery = {
      title: new RegExp(keywords, 'i'),
    };
    return this.courseModel.find(regexQuery);
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
