import { imgDimensionType, selectFile } from "../services/enum";

export interface IEventFile {
  eventId?: string;
  fileId?: string;
  clientOwnerId: string;
  clientId: string;
  name?: string;
  originalFileSize?: number;
  minFileSize?: number;
  microFileSize?: number;
  originalFilePath?: string;
  minFilePath?: string;
  microFilePath?: string;
  originalFileKey?: string;
  minFileKey?: string;
  microFileKey?: string;
  type?: string;
  format?: string;
  errorMsg?: string;
  selected?: boolean;
  index?: number;
  imgDimensionType?: imgDimensionType;
}
export interface IEvent {
  eventId?: string;
  clientId?: string;
  clientName?: string;
  clientOwnerId?: string;
  eventName?: string;
  eventType?: string;
  eventFileList?: IEventFile[];
  eventDate?: string;
  photoCount?: string;
  videoCount?: string;
  selectFile?: selectFile;
}

export interface IEventRedux {
  selectedEvent?: IEvent;
  selectedFiles: IEventFile[];
}

export const defaultIEventRedux: IEventRedux = {
  selectedFiles: [],
};

export interface IClientEventList {
  eventList: IEvent[];
  allEventNameList: IEvent[];
  selectedEvent: IEvent;
}
export const defaultClientEventList: IClientEventList = {
  eventList: [],
  allEventNameList: [],
  selectedEvent: {},
};
