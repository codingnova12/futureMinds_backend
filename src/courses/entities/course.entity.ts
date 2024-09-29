import mongoose, { Model } from 'mongoose';
import { parse } from 'path';

export interface Course {
  title: string;
  author: mongoose.Types.ObjectId;
  rating: any;
  price: any;
  oldPrice: any;
  image: string;
}
export interface courseModel extends Model<Course>{
   
}
export const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
  rating: { type: mongoose.Types.Decimal128, required: true ,get:parseDecimal},
  price: { type: mongoose.Types.Decimal128, required: true,get:parseDecimal },
  oldPrice: { type: mongoose.Types.Decimal128, required: true, get:parseDecimal},
  image: { type: String, required: true },
}, {
    toJSON: {getters: true},
    
});
function parseDecimal(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};
