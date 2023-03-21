import { MutableRefObject } from "react";

export interface IEvent {
  eventName?: string;
  eventType?: string | MutableRefObject<string | undefined>;
  eventDate?: string;
  photoCount?: string;
  videoCount?: string;
}
