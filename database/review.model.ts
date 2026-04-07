"use server";
import { Schema, models, model, Document } from "mongoose";

export interface IReview extends Document {
  user: Schema.Types.ObjectId;
  business: Schema.Types.ObjectId;
  review: string;
  createdAt: Date;
}
const ReviewSchema = new Schema({
  review: { type: String, required: true },
  business: [{ type: Schema.Types.ObjectId, ref: "Business" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
