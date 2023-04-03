import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultICommonInterface,
  ICommonInterface,
} from "../../interfaces/ICommonInterface";

export const commonSlice = createSlice({
  name: "common",
  initialState: defaultICommonInterface,
  reducers: {
    updateLoader: (state, action: PayloadAction<ICommonInterface>) => {
      state.isLoading = action.payload.isLoading;
    },
    updateToken: (state, action: PayloadAction<ICommonInterface>) => {
      state.isValidToken = action.payload.isValidToken;
    },
    updateScreenType: (state, action: PayloadAction<ICommonInterface>) => {
      state.isMobileScreen = action.payload.isMobileScreen;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateLoader, updateToken, updateScreenType } =
  commonSlice.actions;

export const commonReducer = commonSlice.reducer;
