import { Button, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileApi } from "../../../api/uploadFileApi";
import { IFileMeta } from "../../../interfaces/IFileMeta";
import {
  getAddedFileListSelector,
  getSelectedEventSelector,
  getUploadedFileListSelector,
} from "../../../selectors/selectors";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  updateAddedFileList,
  updateUploadedFileList,
} from "../../../slices/user/uploadFileSlice";
import { showEventGallerySelector } from "../../../selectors/showEventGallerySelector";

export const UploadFile: React.FC = () => {
  const dispatch = useDispatch();

  const getSelectedEvent = useSelector(getSelectedEventSelector);
  const addedFiles = useSelector(getAddedFileListSelector);
  const uploadedFiles = useSelector(getUploadedFileListSelector);
  const showEventGallery = useSelector(showEventGallerySelector);

  const uploadFile = (fileVal: Blob) => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("myImage", fileVal);
      formData.append(
        "clientId",
        getSelectedEvent?.clientId as unknown as string | Blob
      );
      formData.append(
        "eventId",
        getSelectedEvent?.eventId as unknown as string | Blob
      );
      const apiResp = await uploadFileApi({
        dispatch: dispatch,
        uri: "uploadFile",
        data: formData,
      });
      apiResp ? resolve(true) : resolve(false);
      dispatch(
        //@ts-ignore
        updateUploadedFileList({ name: fileVal?.name, size: fileVal.size })
      );
    });
  };

  const handleUpload = async (files: FileList | null) => {
    const fileList = files;

    dispatch(updateUploadedFileList({}));
    dispatch(updateAddedFileList({}));

    if (fileList && fileList?.length !== 0) {
      for (let i = 0; i < fileList.length; i++) {
        dispatch(
          //@ts-ignore
          updateAddedFileList({
            name: fileList[i]?.name,
            size: fileList[i]?.size,
          })
        );
      }
    }
    if (fileList && fileList?.length !== 0) {
      for (let i = 0; i < fileList.length; i++) {
        await uploadFile(fileList[i]);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles: any) => {
    handleUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          {uploadedFiles.length === addedFiles.length && (
            <Grid item xs={12}>
              <div className="upload-btn-wrapper centerDiv">
                <button className="midBtn">Upload Images/Videos</button>
                <input
                  onChange={(files) => handleUpload(files.target?.files)}
                  name="file"
                  type="file"
                  accept="file_extension|video/*|image/*"
                  multiple
                />
              </div>
            </Grid>
          )}
        </Grid>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Grid container>
            {uploadedFiles.length === addedFiles.length ? (
              <>
                <Grid item xs={12}>
                  {isDragActive ? (
                    <Grid item xs={12}>
                      <p className="centerDiv" style={{ minHeight: 700 }}>
                        Drop the Files here
                      </p>
                    </Grid>
                  ) : (
                    !showEventGallery && (
                      <Grid container justifyContent="center">
                        <Grid item xs={12}>
                          <p className="centerDiv" style={{ minHeight: 700 }}>
                            Drag and Drop Images and Videos to Upload
                          </p>
                        </Grid>
                      </Grid>
                    )
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <ProgressBar
                        bgColor="#12a212"
                        completed={parseInt(
                          (
                            (uploadedFiles.length / addedFiles.length) *
                            100
                          ).toFixed(2)
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <p className="centerDiv">
                    {uploadedFiles?.length}/{addedFiles?.length}
                  </p>
                  <p className="centerDiv">
                    Uploading file -{" "}
                    <b>{uploadedFiles[uploadedFiles.length - 1]?.name}</b>
                  </p>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
