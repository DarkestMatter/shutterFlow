export interface IEvent {
  eventId: String;
  clientId: String;
  clientName?: String;
  clientOwnerId: String;
  eventName: String;
  eventType?: String;
  eventDate?: String;
  photoCount?: String;
  videoCount?: String;
  eventFileList?: IEventFile[];
  createdDate?: String;
  updatedDate?: String;
}

export interface IEventFile {
  eventId?: String;
  fileId?: String;
  clientOwnerId: String;
  clientId: String;
  name?: String;
  originalFileSize?: Number;
  minFileSize?: Number;
  microFileSize?: Number;
  originalFilePath?: String;
  minFilePath?: String;
  microFilePath?: String;
  originalFileKey?: String;
  minFileKey?: String;
  microFileKey?: String;
  type?: String;
  format?: String;
  errorMsg?: String;
}
