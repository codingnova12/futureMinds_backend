import mongoose from "mongoose";

export interface Seller{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export const SellersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});