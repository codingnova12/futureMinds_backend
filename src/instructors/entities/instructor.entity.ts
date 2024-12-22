import mongoose, { Model } from 'mongoose';
export interface IInstructor {
  firstName: string;
  lastName: string;
  email: string;
  password_hash: string;
  balance: number;
}
export interface instructorModel extends Model<IInstructor> {}
export const instructorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: true },
    balance: { type: Number, required: false, default: 0 },
  },
  {
    toJSON: { getters: true },
  },
);