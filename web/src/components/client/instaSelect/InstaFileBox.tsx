import Grid from "@mui/material/Grid";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { clientEventFileListSelector } from "../../../selectors/clientEventFileListSelector";
import { IEventFile } from "../../../interfaces/IEvent";
import { AppDispatch } from "../../../store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateLikedFile } from "../../../slices/client/clientEventSlice";
import { MouseEvent } from "react";

export const InstaFileBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clientEventFileList = useSelector(clientEventFileListSelector);

  const handleLikedFile = (file: IEventFile, idx: number) => {
    dispatch(
      updateLikedFile({
        eventId: file?.eventId,
        fileId: file?.fileId,
        index: idx,
        liked: !file?.liked,
        clientId: file?.clientId,
        clientOwnerId: file?.clientOwnerId,
        eventFileList: [],
      })
    );
  };

  const handleFileClick = (
    event: MouseEvent<HTMLImageElement, globalThis.MouseEvent>,
    file: IEventFile,
    idx: number
  ) => {
    if (event.detail === 2) {
      handleLikedFile(file, idx);
    }
  };

  return (
    <Grid container>
      {clientEventFileList?.map((file, idx) => {
        return (
          <>
            <Grid item xs={12}>
              <LazyLoad height={"100%"} width={"100%"} offset={50}>
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    marginBottom: -4,
                    cursor: "pointer",
                  }}
                  src={file?.minFilePath}
                  onClick={(e) => handleFileClick(e, file, idx)}
                />
              </LazyLoad>
            </Grid>
            {file?.liked ? (
              <Grid item xs={12}>
                <FavoriteIcon
                  style={{ color: "#d51b1b" }}
                  className="hand"
                  onClick={() => handleLikedFile(file, idx)}
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <FavoriteBorderIcon
                  className="hand"
                  onClick={() => handleLikedFile(file, idx)}
                />
              </Grid>
            )}
          </>
        );
      })}
    </Grid>
  );
};
