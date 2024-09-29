import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;

export const UsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
