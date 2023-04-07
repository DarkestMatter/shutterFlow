import mongoose from "mongoose";
import { IClient } from "../interface/IClient";

const clientSchema = new mongoose.Schema<IClient>({
  clientName: String,
  clientId: String,
  clientMobileNo: String,
  eventType: String,
  eventList: [],
  tileImgUrl: String,
  clientOwnerName: String,
  clientOwnerId: String,
  clientOwnerEmail: String,
  createdDate: String,
  updatedDate: String,
});
export const clientModel = () => mongoose.model("t_client", clientSchema);
