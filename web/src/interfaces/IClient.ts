import { IEvent } from "./IEvent";

export interface IClientData {
  clientName?: string;
  clientId?: string;
  clientMobileNo?: string;
  eventType?: string;
  eventList?: IEvent[];
  eventName?: String;
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
