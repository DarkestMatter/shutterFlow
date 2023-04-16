import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientLikedFileListSelector,
  getSelectedEventSelector,
} from "../../../selectors/selectors";
import { updateSelectAllFile } from "../../../slices/user/eventSlice";
import { deleteEventFilesApi } from "../../../api/deleteEventFilesApi";
import { AppDispatch } from "../../../store";
import { Button } from "@mui/material";
import { FileNameListDialogBox } from "./FileNameListDialogBox";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { dialogName } from "../../../services/enum";

export const GalleryHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  const getSelectedEvent = useSelector(getSelectedEventSelector);
  const getClientLikedFileList = useSelector(getClientLikedFileListSelector);

  const handleSelectAll = () => {
    dispatch(
      updateSelectAllFile({
        selected: !selectedAll,
        clientOwnerId: "",
        clientId: "",
      })
    );
    setSelectedAll(!selectedAll);
  };

  const handleDeleteFile = async () => {
    const fileIdList = getSelectedEvent?.eventFileList
      ?.filter((file) => file?.selected)
      ?.map((file) => {
        return { fileId: file?.fileId, minFilePath: file?.minFilePath };
      });
    await deleteEventFilesApi({
      dispatch: dispatch,
      uri: "deleteFile",
      data: {
        eventFileList: fileIdList,
        eventId: getSelectedEvent?.eventId,
      },
    });
  };

  return (
    <Grid container style={{ margin: 15 }}>
      <FileNameListDialogBox />
      <Grid item xs={5}>
        <Grid container>
          <Grid item xs={12}>
            <span style={{ fontSize: 24 }}>
              <b>{getSelectedEvent?.eventName || "Liked"}</b>
            </span>
          </Grid>
          <Grid container item xs={12} style={{ marginLeft: 5 }}>
            <span>
              {getSelectedEvent?.eventFileList?.length ||
                getClientLikedFileList?.length}
              {` files`}
            </span>
          </Grid>
        </Grid>
      </Grid>
      {getSelectedEvent?.eventName && (
        <>
          <Grid item xs={2}>
            <Button
              className="smallBtn"
              variant="outlined"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className="smallBtn"
              variant="outlined"
              onClick={handleDeleteFile}
            >
              Delete File
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={12} className="horizontalBar"></Grid>
    </Grid>
  );
};
