import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultIUserProfile,
  IUserProfile,
} from "../../interfaces/IUserProfile";
import {
  submitRegistrationFormThunk,
  submitRegistrationOtpThunk,
} from "../../thunk/registrationThunk";

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: defaultIUserProfile,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<IUserProfile>) => {
      switch (true) {
        case Object.keys(action.payload).includes("email"):
          state.email = action.payload?.email;
        case Object.keys(action.payload).includes("studioName"):
          state.studioName = action.payload?.studioName;
        case Object.keys(action.payload).includes("mobile"):
          state.mobile = action.payload?.mobile;
        case Object.keys(action.payload).includes("userId"):
          state.userId = action.payload?.userId;
        case Object.keys(action.payload).includes("status"):
          state.status = action.payload?.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      submitRegistrationFormThunk.fulfilled,
      (state, action) => {}
    );
    builder.addCase(
      submitRegistrationOtpThunk.fulfilled,
      (state, action) => {}
    );
  },
});

export const { updateUserProfile } = userProfileSlice.actions;

export const userProfileReducer = userProfileSlice.reducer;
