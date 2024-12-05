import mongoose, { Mongoose } from 'mongoose';

export class Course {
  constructor(
    public title: string,
    public author: string,
    public rating: number,
    public price: number,
      public oldPrice: number,
    public videoLink: string,
    public thumbnailLink: string
  ) {}
}
