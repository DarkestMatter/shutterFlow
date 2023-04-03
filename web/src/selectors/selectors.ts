import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const state = (state: RootState) => state;

export const isValidTokenSelector = createSelector(
  state,
  (state) => state?.common?.isValidToken
);

export const getUserProfileSelector = createSelector(
  state,
  (state) => state?.userProfile
);

export const getClientProfileSelector = createSelector(
  state,
  (state) => state?.clientProfile
);

export const getUserEmailSelector = createSelector(
  state,
  (state) => state?.userProfile?.email
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

export const getClientListSelector = createSelector(
  state,
  (state) => state?.user?.clientList
);

export const getSelectedClientSelector = createSelector(
  state,
  (state) => state?.user?.selectedClient
);

export const getUploadedFileListSelector = createSelector(
  state,
  (state) => state?.upload?.uploadedFileList
);

export const getAddedFileListSelector = createSelector(
  state,
  (state) => state?.upload?.addedFileList
);

export const getSelectedEventSelector = createSelector(
  state,
  (state) => state?.event?.selectedEvent
);

export const getEventFileListSelector = createSelector(
  state,
  (state) => state?.event?.selectedEvent?.eventFileList
);

export const getSelectedEventNameSelector = createSelector(
  state,
  (state) => state?.event?.selectedEvent?.eventName
);

export const getSelectFileEnabledSelector = createSelector(
  state,
  (state) => state?.event?.selectedEvent?.selectFile
);

export const getSelectedFilesSelector = createSelector(
  state,
  (state) => state?.event?.selectedFiles
);
