import { createSelector } from "@reduxjs/toolkit";
import { getSelectFileEnabledSelector } from "./selectors";

export const selectedFileBorderSelector = createSelector(
  [getSelectFileEnabledSelector],
  (getSelectFileEnabled) => {
    return; //uploadedFiles?.length === addedFiles?.length;
  }
);
