import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultIFileMetaList,
  IFileMeta,
  IFileMetaList,
} from "../../interfaces/IFileMeta";

export const uploadFileSlice = createSlice({
  name: "upload",
  initialState: defaultIFileMetaList,
  reducers: {
    updateUploadedFileList: (state, action: PayloadAction<IFileMeta>) => {
      if (action.payload?.name) {
        state.uploadedFileList = [
          ...state.uploadedFileList,
          { name: action.payload?.name, size: action.payload?.size },
        ];
      } else {
        state.uploadedFileList = [];
      }
    },
    updateAddedFileList: (state, action: PayloadAction<IFileMeta>) => {
      if (action.payload?.name) {
        state.addedFileList = [
          ...state.addedFileList,
          { name: action.payload?.name, size: action.payload?.size },
        ];
      } else {
        state.addedFileList = [];
      }
    },
  },
});

export const { updateUploadedFileList, updateAddedFileList } =
  uploadFileSlice.actions;

export const uploadReducer = uploadFileSlice.reducer;
