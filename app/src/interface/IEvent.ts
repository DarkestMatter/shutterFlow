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
  eventItemlist?: IEventItemList;
  createdDate?: String;
  updatedDate?: String;
}

export interface IEventItemList {
  name: String;
  url: String;
  type: String;
  format: String;
}
