"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import Review from "@/database/review.model";

export async function createReview(params: any) {
  try {
    connectToDatabase();
    const review = await getReview({
      business: params.business,
      user: params.user,
    });
    if (review) {
      return JSON.stringify({
        success: false,
        error: "You have already reviewed this business",
      });
    }
    const newReview = await Review.create(params);
    revalidatePath(`/service/${params.business}`);
    return JSON.stringify(newReview);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getReview(params: any) {
  try {
    connectToDatabase();
    const review = await Review.findOne({ ...params });
    return review;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getReviews(params: any) {
  try {
    connectToDatabase();
    const review = await Review.find({ ...params });
    return review;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
