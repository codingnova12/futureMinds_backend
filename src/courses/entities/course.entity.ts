import mongoose, { Model } from 'mongoose';
export interface ICourse {
  title: string;
  author: mongoose.Types.ObjectId;
  rating: any;
  price: any;
  oldPrice: any;
  thumbnailLink?: string;
  stripeProductPriceId?: string;
}
export interface courseModel extends Model<ICourse> {}
export const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    rating: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    oldPrice: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    thumbnailLink: { type: String, required: false },
    stripeProductPriceId: { type: String, required: false },
  },
  {
    toJSON: { getters: true },
  },
);
function parseDecimal(value) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
}
