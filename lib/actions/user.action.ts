"use server";

import User from "@/database/user.model";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createUser(userData: any) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateUser(userData: any) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = userData;
    const newUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(params: any) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) throw new Error("User not found");
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUser(params: any) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });
    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
