"use server";
import Booking from "@/database/booking.model";
import { connectToDatabase } from "../mongoose";

export async function createBooking(params: any) {
  try {
    connectToDatabase();
    const newBooking = await Booking.create(params);
    return JSON.stringify(newBooking);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
