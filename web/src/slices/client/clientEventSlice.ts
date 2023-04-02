import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, defaultClientEventList } from "../../interfaces/IEvent";

export const clientEventSlice = createSlice({
  name: "clientEvent",
  initialState: defaultClientEventList,
  reducers: {
    updateClientEventList: (state, action: PayloadAction<IEvent>) => {
      const eventAlreadyExists = state.eventList.map(
        (event) => event?.eventName === action.payload?.eventName
      );
      if (action.payload?.clientId && eventAlreadyExists.length === 0) {
        state.eventList = [...state.eventList, action.payload];
      }
    },
  },
});

export const { updateClientEventList } = clientEventSlice.actions;

export const clientEventReducer = clientEventSlice.reducer;
