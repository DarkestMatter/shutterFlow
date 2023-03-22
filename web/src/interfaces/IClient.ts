import { MutableRefObject } from "react";
import { IEvent } from "./IEvent";

export interface IClientData {
  clientName?: string;
  clientMobileNo?: string;
  eventType?: string;
  eventList?: IEvent[];
  clientOwnerId?: string;
  clientOwnerEmail?: string;
  clientTileImgUrl?: string;
  tileImgUrl?: string;
}

export interface IClient {
  selectedClient?: IClientData;
  clientList?: IClientData[];
}

export const defaultClient: IClient = {
  selectedClient: {},
  clientList: [],
};
