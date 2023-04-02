import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultIClientProfile,
  IClientProfile,
} from "../../interfaces/IClientProfile";

export const clientProfileSlice = createSlice({
  name: "clientProfile",
  initialState: defaultIClientProfile,
  reducers: {
    updateClientProfile: (state, action: PayloadAction<IClientProfile>) => {
      switch (true) {
        case Object.keys(action.payload).includes("email"):
          state.email = action.payload?.email;
        case Object.keys(action.payload).includes("name"):
          state.name = action.payload?.name;
        case Object.keys(action.payload).includes("mobile"):
          state.mobile = action.payload?.mobile;
        case Object.keys(action.payload).includes("status"):
          state.status = action.payload?.status;
        case Object.keys(action.payload).includes("customerType"):
          state.customerType = action.payload?.customerType;
        case Object.keys(action.payload).includes("clientId"):
          state.clientId = action.payload?.clientId;
      }
    },
  },
});

export const { updateClientProfile } = clientProfileSlice.actions;

export const clientProfileReducer = clientProfileSlice.reducer;
