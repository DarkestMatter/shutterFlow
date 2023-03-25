import mongoose from "mongoose";
import { IUserProfile } from "../interface/IUserProfile";

const userProfileSchema = new mongoose.Schema<IUserProfile>({
  userId: String,
  email: String,
  studioName: String,
  mobile: String,
  pwd: String,
  status: String,
  customerType: String,
  createdDate: String,
  udpatedDate: String,
});
export const userProfileModel = () =>
  mongoose.model("t_user", userProfileSchema);
