import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialogBox } from "../../interfaces/IDialogBox";

export const dialogBoxSclice = createSlice({
  name: "dialog",
  initialState: { dialogName: "" },
  reducers: {
    openDialogBox: (state, action: PayloadAction<IDialogBox>) => {
      state.dialogName = action.payload?.dialogName;
    },
  },
  extraReducers: (builder) => {},
});

export const { openDialogBox } = dialogBoxSclice.actions;

export const dialogBoxReducer = dialogBoxSclice.reducer;
