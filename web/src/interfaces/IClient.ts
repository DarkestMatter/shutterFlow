import { MutableRefObject } from "react";
import { IEvent } from "./IEvent";

export interface IClientData {
  clientName?: string | MutableRefObject<string | undefined>;
  clientMobileNo?: string | MutableRefObject<string | undefined>;
  eventType?: string | MutableRefObject<string | undefined>;
  eventList?: IEvent[];
  clientOwnerId?: string;
  clientOwnerEmail?: string;
  clientTileImgUrl?: string;
}

export interface IClient {
  selected?: IClientData;
  clientList?: IClientData[];
}

export const defaultClient: IClient = {
  selected: {},
  clientList: [],
};
