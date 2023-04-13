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
    updateSelectAllFile: (state, action: PayloadAction<IEventFile>) => {
      state?.selectedEvent?.eventFileList?.map(
        (file) => (file.selected = action.payload?.selected)
      );
    },
    updateSelectedFile: (state, action: PayloadAction<IEventFile>) => {
      state?.selectedEvent?.eventFileList?.map((file) => {
        if (action.payload?.fileId === file?.fileId) {
          file.selected = action.payload?.selected;
        }
      });
    },
  },
});

export const { updateSelectedEvent, updateSelectedFile, updateSelectAllFile } =
  eventSlice.actions;

export const eventReducer = eventSlice.reducer;
