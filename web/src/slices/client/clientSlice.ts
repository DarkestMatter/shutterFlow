import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultClient, IClientData } from "../../interfaces/IClient";
import { addClientThunk } from "../../thunk/addClientThunk";
import { getClientListThunk } from "../../thunk/getClientListThunk";

export const userSlice = createSlice({
  name: "client",
  initialState: defaultClient,
  reducers: {
    updateClientList: (state, action: PayloadAction<IClientData[]>) => {
      state.clientList = action.payload;
    },
    updateSelectedClient: (state, action: PayloadAction<IClientData>) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addClientThunk.fulfilled, (state, action) => {});
    builder.addCase(getClientListThunk.fulfilled, (state, action) => {});
  },
});

export const { updateClientList } = userSlice.actions;
export const { updateSelectedClient } = userSlice.actions;

export const userReducer = userSlice.reducer;
