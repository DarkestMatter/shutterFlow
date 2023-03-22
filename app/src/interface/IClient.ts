import { IEvent } from "./IEvent";

export interface IClient {
  clientName: String;
  clientId: String;
  clientMobileNo: String;
  eventType: String;
  eventList: IEvent[];
  clientOwnerName?: String;
  clientOwnerId?: String;
  clientOwnerEmail?: String;
  createdDate?: String;
  updatedDate: String;
}
