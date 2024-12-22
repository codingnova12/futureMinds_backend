import mongoose, { Model } from 'mongoose';
export interface orderModel extends Model<IOrder> {}
export const OrdersSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  amountSubtotal: { type: Number, required: false },
  courses: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
  paymentIntent: { type: String, required: false },
  paymentMethod: { type: String, required: false },
  receiptUrl: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Failed', 'Success'],
    default: 'Pending',
  },
});
export interface IOrder {
  orderId;
  userId: string;
  instructorId: string;
  receiptUrl: string;
  paymentIntent: string;
  paymentMethod: string;
}
