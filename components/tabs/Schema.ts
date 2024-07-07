"use client";

import { z } from "zod";

export const formSchema = z.object({
  accountType: z.string(),
  category: z.string(),
  full_name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  terms: z.boolean(),
  contactNumber: z.string(),
  logo: z.any(),
  brand_name: z.string(),
  secondaryContactNumber: z.string(),
  insta_link: z.string(),
  fb_link: z.string(),
  booking_email: z.string(),
  web: z.string(),
  city: z.string(),
  office_address: z.string(),
  office_google_link: z.string(),
  cities: z.array(z.string()),
  male_staff: z.boolean(),
  female_staff: z.boolean(),
  transgender_staff: z.boolean(),
  minPrice: z.string(),
  description: z.string(),
  additionalInfo: z.string(),
  downPayment: z.string(),
  downPaymentType: z.string(),
  refundable: z.string(),
  packages: z.array(
    z.object({
      packageName: z.string(),
      packagePrice: z.string(),
      services: z.string(),
    })
  ),
  images: z.array(z.any()),
});
