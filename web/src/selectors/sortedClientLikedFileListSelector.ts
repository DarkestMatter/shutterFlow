import { createSelector } from "@reduxjs/toolkit";
import { IEventFile } from "../interfaces/IEvent";
import { clientEventFileListSelector } from "./clientEventFileListSelector";
import { getClientLikedFileListSelector } from "./selectors";

export const sortedClientLikedFileListSelector = createSelector(
  getClientLikedFileListSelector,
  (getClientLikedFileList) => {
    const position = window.innerWidth;
    let arr: IEventFile[][] = [];
    switch (true) {
      case position < 900:
        arr = [[], []];
        getClientLikedFileList?.map((file, idx) => {
          switch (true) {
            case idx % 2 === 0:
              arr[0].push(file);
              break;
            case idx % 2 === 1:
              arr[1].push(file);
              break;
          }
        });
        break;
      case position < 1200:
        arr = [[], [], []];
        getClientLikedFileList?.map((file, idx) => {
          switch (true) {
            case idx % 3 === 0:
              arr[0].push(file);
              break;
            case idx % 3 === 1:
              arr[1].push(file);
              break;
            case idx % 3 === 2:
              arr[2].push(file);
              break;
          }
        });
        break;
      default:
        arr = [[], [], [], []];
        getClientLikedFileList?.map((file, idx) => {
          switch (true) {
            case idx % 4 === 0:
              arr[0].push(file);
              break;
            case idx % 4 === 1:
              arr[1].push(file);
              break;
            case idx % 4 === 2:
              arr[2].push(file);
              break;
            case idx % 4 === 3:
              arr[3].push(file);
              break;
          }
        });
        break;
    }
    return arr;
  }
);
