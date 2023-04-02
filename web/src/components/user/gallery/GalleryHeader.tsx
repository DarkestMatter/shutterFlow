import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventFilesApi } from "../../../api/deleteEventFilesApi";
import {
  getSelectedEventNameSelector,
  getSelectedFilesSelector,
  getSelectFileEnabledSelector,
} from "../../../selectors/selectors";
import { selectFile } from "../../../services/enum";
import { updateSelectFileEnabler } from "../../../slices/user/eventSlice";
import { AppDispatch } from "../../../store";

export const GalleryHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getSelectedEventName = useSelector(getSelectedEventNameSelector);
  const getSelectFileEnabled = useSelector(getSelectFileEnabledSelector);
  const getSelectedFiles = useSelector(getSelectedFilesSelector);

  const handleSelectFileEnabler = (value: selectFile) => {
    if (getSelectFileEnabled !== value) {
      dispatch(updateSelectFileEnabler({ selectFile: value }));
    } else {
      dispatch(updateSelectFileEnabler({ selectFile: undefined }));
    }
  };

  const handleDeleteFile = async () => {
    const fileIdList = getSelectedFiles.map((file) => file?.fileId);
    await deleteEventFilesApi({
      dispatch: dispatch,
      uri: "deleteFile",
      data: {
        fileId: fileIdList,
      },
    });
  };

  return (
    <Grid container style={{ margin: 15 }}>
      <Grid item xs={8}>
        <span style={{ fontSize: 24 }}>
          <b>{getSelectedEventName}</b>
        </span>
      </Grid>
      <Grid
        item
        xs={1}
        className="hand"
        onClick={() => handleSelectFileEnabler(selectFile?.one)}
      >
        <span>Select</span>
      </Grid>
      <Grid
        item
        xs={2}
        className="hand"
        onClick={() => handleSelectFileEnabler(selectFile?.all)}
      >
        <span>Select All</span>
      </Grid>
      {getSelectFileEnabled && (
        <Grid item xs={1} className="hand" onClick={handleDeleteFile}>
          <span>Delete</span>
        </Grid>
      )}
      <Grid item xs={12} className="horizontalBar"></Grid>
    </Grid>
  );
};
