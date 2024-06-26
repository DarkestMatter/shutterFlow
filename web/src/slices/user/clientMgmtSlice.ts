import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultClient, IClientData } from "../../interfaces/IClient";
import { IEvent } from "../../interfaces/IEvent";

export const clientMgmtSlice = createSlice({
  name: "client",
  initialState: defaultClient,
  reducers: {
    updateClientList: (state, action: PayloadAction<IClientData[]>) => {
      state.clientList = action.payload;
    },
    updateSelectedClient: (state, action: PayloadAction<IClientData>) => {
      state.selectedClient = action.payload;
    },
    updateSelectedClientEventList: (state, action: PayloadAction<IEvent>) => {
      if (state?.selectedClient) {
        state.selectedClient.eventList?.push(action.payload);
      }
    },
  },
});

export const {
  updateClientList,
  updateSelectedClientEventList,
  updateSelectedClient,
} = clientMgmtSlice.actions;

export const userReducer = clientMgmtSlice.reducer;
