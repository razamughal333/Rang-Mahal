/* eslint-disable camelcase */
"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import Business from "@/database/business.model";
import bcrypt from "bcrypt";
const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

async function uploadFile(file: any, UPLOAD_DIR: string, filename: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  fs.writeFileSync(path.resolve(UPLOAD_DIR, filename), buffer);
}
function getFileName(file: any) {
  let filenExt = "";
  if (file.file) {
    filenExt = file.file.name.split(".");
  } else {
    filenExt = file.name.split(".");
  }
  filenExt = filenExt[filenExt.length - 1];
  const filename = randomUUID();
  return filename + "." + filenExt;
}
export async function createBusiness(params: any) {
  try {
    connectToDatabase();
    const { business, rePath, logo, images } = params;
    const parsedbusiness = JSON.parse(business);

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }
    const UPLOADDIR = path.resolve(
      process.env.ROOT_PATH ?? "",
      `public/uploads/${parsedbusiness.brand_name}`
    );
    const newLogo = Object.fromEntries(logo);
    const file = (newLogo.file as Blob) || null;
    let logoFileName = "";
    if (file) {
      logoFileName = getFileName(newLogo);
      await uploadFile(file, UPLOADDIR, logoFileName);
    } else {
      return JSON.stringify({
        success: false,
      });
    }
    const imagesFileNames = [];
    for (const image of images) {
      const newImage = (image[1] as Blob) || null;
      if (newImage) {
        const fileName = getFileName(image[1]);
        await uploadFile(newImage, UPLOADDIR, fileName);
        imagesFileNames.push(fileName);
      }
    }
    const hashPassword = await bcrypt.hash(parsedbusiness.password, 10);
    delete parsedbusiness.confirmPassword;
    const newBusiness = await Business.create({
      ...parsedbusiness,
      logo: logoFileName,
      images: imagesFileNames,
      password: hashPassword,
    });
    revalidatePath(rePath);
    return JSON.stringify({
      success: true,
      business: newBusiness,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getBusinessesByFilter(category: string, filters: any) {
  try {
    connectToDatabase();
    let cities = [];
    if (filters.cities !== "" && filters.cities) {
      cities = filters.cities.split(",").filter((el: any) => el !== "");
    }
    let staff = [];
    let newStaff = {};
    if (filters.staff !== "" && filters.staff) {
      staff = filters.staff.split(",").filter((el: any) => el !== "");
      for (const st of staff) {
        if (st === "male") {
          newStaff = { ...newStaff, male_staff: true };
        } else if (st === "female") {
          newStaff = { ...newStaff, female_staff: true };
        } else if (st === "transgender") {
          newStaff = { ...newStaff, transgender_staff: true };
        }
      }
    }
    if (cities.length !== 0) {
      newStaff = { ...newStaff, cities: { $in: cities } };
    }
    const businesses = await Business.find({
      category,
      ...newStaff,
    });
    return JSON.stringify({
      businesses,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getBusinessesById(id: string) {
  try {
    connectToDatabase();
    const business = await Business.findById(id);
    return JSON.stringify({
      business,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
