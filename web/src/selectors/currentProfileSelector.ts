import { createSelector } from "@reduxjs/toolkit";
import {
  getClientProfileSelector,
  getSelectFileEnabledSelector,
  getUserProfileSelector,
} from "./selectors";

export const currentProfileTypeSelector = createSelector(
  [getUserProfileSelector, getClientProfileSelector],
  (getUserProfile, getClientProfile) => {
    return getUserProfile?.customerType || getClientProfile?.customerType;
  }
);
