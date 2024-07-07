import { Schema, models, model } from "mongoose";

const BusinessSchema = new Schema({
  accountType: { type: String },
  category: { type: String },
  full_name: { type: String },
  email: { type: String },
  phone: { type: String },
  password: { type: String },
  confirmPassword: { type: String },
  terms: { type: Boolean },
  contactNumber: { type: String },
  secondaryContactNumber: { type: String },
  insta_link: { type: String },
  fb_link: { type: String },
  logo: { type: String },
  brand_name: { type: String },
  booking_email: { type: String },
  web: { type: String },
  city: { type: String },
  office_address: { type: String },
  office_google_link: { type: String },
  cities: { type: Array },
  male_staff: { type: Boolean },
  female_staff: { type: Boolean },
  transgender_staff: { type: Boolean },
  minPrice: { type: String },
  description: { type: String },
  additionalInfo: { type: String },
  downPayment: { type: String },
  downPaymentType: { type: String },
  refundable: { type: String },
  packages: {
    type: Object,
  },
  images: { type: Array },
  status: { type: Boolean, default: false },
});

const Business = models.Business || model("Business", BusinessSchema);

export default Business;
