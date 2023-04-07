import { createSelector } from "@reduxjs/toolkit";
import { getClientSelectedEventSelector, state } from "./selectors";

export const clientEventFileListSelector = createSelector(
  state,
  getClientSelectedEventSelector,
  (state, getClientSelectedEvent) => {
    return state?.clientEvent?.eventList?.find(
      (event) => event?.eventId === getClientSelectedEvent?.eventId
    )?.eventFileList;
  }
);
