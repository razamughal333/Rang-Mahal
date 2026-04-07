"use server";
import { Schema, models, model, Document } from "mongoose";

export interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  business: Schema.Types.ObjectId;
  pack: object;
  createdAt: Date;
}
const BookingSchema = new Schema({
  pack: { type: Object, required: true },
  business: { type: Schema.Types.ObjectId, ref: "Business" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
