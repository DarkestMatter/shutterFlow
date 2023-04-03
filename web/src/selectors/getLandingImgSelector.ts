import { createSelector } from "@reduxjs/toolkit";
import { imgDimensionType } from "../services/enum";
import { state } from "./selectors";

export const getLandingImageDataSelector = createSelector(state, (state) => {
  if (
    state?.clientEvent &&
    state?.clientEvent?.eventList &&
    state?.clientEvent?.eventList[0]?.eventFileList
  ) {
    return state?.clientEvent?.eventList[0]?.eventFileList.find((file) => {
      if (
        state.common?.isMobileScreen &&
        file?.imgDimensionType === imgDimensionType.portrait
      ) {
        return true;
      } else if (
        !state.common?.isMobileScreen &&
        file?.imgDimensionType === imgDimensionType.landscape
      ) {
        return true;
      } else {
        return true;
      }
    });
  }
});
