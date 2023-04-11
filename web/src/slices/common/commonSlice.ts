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
      state.isLoading = action.payload?.isLoading;
    },
    updateToken: (state, action: PayloadAction<ICommonInterface>) => {
      state.isValidToken = action.payload?.isValidToken;
    },
    updateScreenType: (state, action: PayloadAction<ICommonInterface>) => {
      state.isMobileScreen = action.payload?.isMobileScreen;
    },
    updateWindowWidth: (state, action: PayloadAction<ICommonInterface>) => {
      state.windowWidth = action.payload?.windowWidth;
    },
    updateLastScrollPosition: (
      state,
      action: PayloadAction<ICommonInterface>
    ) => {
      state.lastScrollPosition = action.payload?.lastScrollPosition;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  updateLoader,
  updateToken,
  updateScreenType,
  updateWindowWidth,
  updateLastScrollPosition,
} = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
