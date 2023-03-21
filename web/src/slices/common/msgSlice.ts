import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultIMsg, IMsg } from "../../interfaces/IMsg";

export const msgSlice = createSlice({
  name: "msg",
  initialState: defaultIMsg,
  reducers: {
    updateMsg: (state, action: PayloadAction<IMsg>) => {
      switch (true) {
        case Object.keys(action.payload).includes("successMsg"):
          state.successMsg = action.payload?.successMsg;
        case Object.keys(action.payload).includes("errorMsg"):
          state.errorMsg = action.payload?.errorMsg;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { updateMsg } = msgSlice.actions;

export const msgSliceReducer = msgSlice.reducer;
