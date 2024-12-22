import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { Express } from 'express';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail', { dest: 'courses_thumbnails' }))
  create(
    @UploadedFile(
      new ParseFilePipe({
        // validators: [new FileTypeValidator({ fileType: 'video/mp4' })],
      }),
    )
    thumbnail: Express.Multer.File,
    @Body()
    course: CreateCourseDto,
  ) {
    return this.coursesService.create(thumbnail, course);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @Get('search/:keywords')
  async searchCourses(@Param('keywords') keywords) {
    if (keywords == '*') return await this.coursesService.searchCourses({});
    var regexQuery = {
      title: new RegExp(keywords, 'i'),
    };
    return await this.coursesService.searchCourses(regexQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
