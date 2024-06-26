import mongoose from "mongoose";
import { IClient } from "../interface/IClient";
import { ILoginCred } from "../interface/ILoginCred";

const loginCredSchema = new mongoose.Schema<ILoginCred>({
  name: String,
  studioName: String,
  email: String,
  mobile: String,
  pwd: String,
  userId: String,
  status: String,
  clientId: String,
  customerType: String,
  otp: String,
  createdDate: String,
  updatedDate: String,
});
export const loginCredModel = () =>
  mongoose.model("t_login_cred", loginCredSchema);
