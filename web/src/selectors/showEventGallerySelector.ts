import { createSelector } from "@reduxjs/toolkit";
import {
  getAddedFileListSelector,
  getUploadedFileListSelector,
} from "./selectors";

export const showEventGallerySelector = createSelector(
  [getUploadedFileListSelector, getAddedFileListSelector],
  (uploadedFiles, addedFiles) => {
    return uploadedFiles?.length === addedFiles?.length;
  }
);
