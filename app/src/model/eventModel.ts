import mongoose from "mongoose";
import { IClient } from "../interface/IClient";
import { IEvent } from "../interface/IEvent";

const eventSchema = new mongoose.Schema<IEvent>({
  eventId: String,
  clientId: String,
  clientName: String,
  clientOwnerId: String,
  eventName: String,
  eventType: String,
  eventDate: String,
  photoCount: String,
  videoCount: String,
  eventFileList: [],
  createdDate: String,
  updatedDate: String,
});
export const eventModel = () => mongoose.model("t_event", eventSchema);
