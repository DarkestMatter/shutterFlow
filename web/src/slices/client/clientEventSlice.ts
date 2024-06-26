import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEvent,
  defaultClientEventList,
  IEventFile,
} from "../../interfaces/IEvent";

export const clientEventSlice = createSlice({
  name: "clientEvent",
  initialState: defaultClientEventList,
  reducers: {
    updateClientEventList: (state, action: PayloadAction<IEvent>) => {
      const eventAlreadyExists = state.eventList.some(
        (event) => event?.eventName === action.payload?.eventName
      );
      if (action.payload?.clientId && !eventAlreadyExists) {
        state.eventList = [...state.eventList, action.payload];
      }
    },
    updateClientAllEventNameList: (state, action: PayloadAction<IEvent[]>) => {
      state.allEventNameList = action.payload;
    },
    updateClientSelectedEvent: (state, action: PayloadAction<IEvent>) => {
      state.selectedEvent = action.payload;
    },
    updateLikedFile: (state, action: PayloadAction<IEvent & IEventFile>) => {
      state.eventList?.map((event, idx) => {
        if (event?.eventId === action?.payload?.eventId) {
          event?.eventFileList?.map((file, index) => {
            if (
              file?.fileId === action?.payload?.fileId &&
              state.eventList[idx]
            ) {
              //@ts-ignore
              state.eventList[idx].eventFileList[index].liked =
                action.payload.liked;
            }
          });
        }
      });
    },
    updateClientSelectedFile: (
      state,
      action: PayloadAction<IEvent & IEventFile>
    ) => {
      state.selectedFile = action.payload;
    },
    updateClientLikedFileList: (state, action: PayloadAction<IEventFile[]>) => {
      state.likedFileList = action.payload;
    },
    updateRemoveClientLikedFile: (state, action: PayloadAction<IEventFile>) => {
      if (action.payload?.fileId) {
        state.likedFileList?.map((file, idx) => {
          if (file?.fileId === action.payload?.fileId) {
            state.likedFileList?.splice(idx, 1);
            return;
          }
        });
      }
    },
  },
});

export const {
  updateClientEventList,
  updateClientAllEventNameList,
  updateClientSelectedEvent,
  updateLikedFile,
  updateClientSelectedFile,
  updateClientLikedFileList,
  updateRemoveClientLikedFile,
} = clientEventSlice.actions;

export const clientEventReducer = clientEventSlice.reducer;
