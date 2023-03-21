import mongoose from "mongoose";
import { IUserProfile } from "../interface/IUserProfile";

const userProfileSchema = new mongoose.Schema<IUserProfile>({
  userId: String,
  email: String,
  studioName: String,
  mobile: String,
  pwd: String,
  status: String,
  otp: Number,
});
export const userProfileModel = () =>
  mongoose.model("t_user", userProfileSchema);
