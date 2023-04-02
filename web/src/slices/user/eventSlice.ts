import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultIEventRedux,
  IEvent,
  IEventFile,
} from "../../interfaces/IEvent";

export const eventSlice = createSlice({
  name: "event",
  initialState: defaultIEventRedux,
  reducers: {
    updateSelectedEvent: (state, action: PayloadAction<IEvent>) => {
      state.selectedEvent = action.payload;
    },
    updateSelectFileEnabler: (state, action: PayloadAction<IEvent>) => {
      if (state.selectedEvent) {
        state.selectedEvent.selectFile = action.payload?.selectFile;
      }
    },
    updateSelectedFile: (state, action: PayloadAction<IEventFile & IEvent>) => {
      if (
        state.selectedEvent &&
        action.payload.index &&
        state?.selectedEvent.eventFileList &&
        state?.selectedEvent.eventFileList[action.payload.index]
      ) {
        state.selectedEvent.eventFileList[action.payload?.index].selected =
          action.payload?.selected;
        state.selectedFiles = [
          ...state.selectedFiles,
          {
            fileId: action.payload?.fileId,
            clientId: action.payload?.clientId,
            clientOwnerId: action.payload?.clientOwnerId,
          },
        ];
      }
    },
  },
});

export const {
  updateSelectedEvent,
  updateSelectFileEnabler,
  updateSelectedFile,
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
