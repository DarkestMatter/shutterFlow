import { createSelector } from "@reduxjs/toolkit";
import { imgDimensionType } from "../services/enum";
import { state } from "./selectors";

export const getClientGalleryEventListSelector = createSelector(
  state,
  (state) => {
    console.log(state?.clientEvent);
    return state?.clientEvent?.eventList[0]?.eventFileList;
  }
);
