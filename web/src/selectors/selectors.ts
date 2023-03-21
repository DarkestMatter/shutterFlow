import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const state = (state: RootState) => state;

export const isValidTokenSelector = createSelector(
  state,
  (state) => state?.common?.isValidToken
);

export const getUserProfileSelector = createSelector(
  state,
  (state) => state?.profile
);

export const getUserEmailSelector = createSelector(
  state,
  (state) => state?.profile?.email
);

export const getMsgSelector = createSelector(state, (state) => state?.msg);

export const isLoadingSelector = createSelector(
  state,
  (state) => state.common.isLoading
);

export const getDialogBoxSelector = createSelector(
  state,
  (state) => state?.dialog?.dialogName
);
