import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, defaultClientEventList } from "../../interfaces/IEvent";

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
  },
});

export const {
  updateClientEventList,
  updateClientAllEventNameList,
  updateClientSelectedEvent,
} = clientEventSlice.actions;

export const clientEventReducer = clientEventSlice.reducer;
