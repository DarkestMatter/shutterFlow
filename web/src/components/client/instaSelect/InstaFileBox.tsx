import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Card, CardActionArea, CardActions, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { MouseEvent, useEffect } from "react";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import { fileLikedApi } from "../../../api/fileLikedApi";
import { IEventFile } from "../../../interfaces/IEvent";
import { clientEventFileListSelector } from "../../../selectors/clientEventFileListSelector";
import {
  getClientSelectedFileSelector,
  getWindowWidthSelector,
} from "../../../selectors/selectors";
import { updateLikedFile } from "../../../slices/client/clientEventSlice";
import { AppDispatch } from "../../../store";

export const InstaFileBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getClientSelectedFile = useSelector(getClientSelectedFileSelector);
  const clientEventFileList = useSelector(clientEventFileListSelector);
  const getWindowWidth = useSelector(getWindowWidthSelector);

  const handleLikeBtn = async (file: IEventFile, idx: number) => {
    const fileLikedObj = {
      eventId: file?.eventId,
      fileId: file?.fileId,
      index: idx,
      liked: !file?.liked,
      clientId: file?.clientId,
      clientOwnerId: file?.clientOwnerId,
    };
    dispatch(updateLikedFile(fileLikedObj));
    const fileLiked = await fileLikedApi({
      dispatch: dispatch,
      uri: "fileLiked",
      data: fileLikedObj,
    });
    !fileLiked &&
      dispatch(updateLikedFile({ ...fileLikedObj, liked: file?.liked }));
  };

  const handleFileClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    file: IEventFile,
    idx: number
  ) => {
    if (event.detail === 2) {
      handleLikeBtn(file, idx);
    }
  };

  const scrollToPosition = () => {
    if (getClientSelectedFile?.fileId) {
      const element = document.getElementById(getClientSelectedFile?.fileId);
      element?.scrollIntoView();
      console.log(getClientSelectedFile?.fileId);
    }
  };

  useEffect(() => {
    scrollToPosition();
  }, []);

  return (
    <Grid container>
      {getWindowWidth &&
        clientEventFileList?.map((file, idx) => {
          return (
            <Grid item xs={12} key={file?.fileId} id={file?.fileId}>
              <Card
                onClick={(e) => handleFileClick(e, file, idx)}
                style={{
                  marginTop: 5,
                  marginLeft: 2,
                  marginRight: 2,
                }}
                key={file?.fileId}
                id={file?.fileId}
              >
                <CardActionArea>
                  <LazyLoad
                    height={
                      file?.imgHeight && file?.imgWidth
                        ? (getWindowWidth / file?.imgWidth) * file?.imgHeight
                        : "inherit"
                    }
                    width={getWindowWidth}
                    offset={50}
                  >
                    <img
                      style={{
                        height: "inherit",
                        width: "inherit",
                      }}
                      src={file?.minFilePath}
                    />
                  </LazyLoad>
                </CardActionArea>
                <CardActions
                  disableSpacing
                  style={{
                    justifyContent: "right",
                    marginRight: 15,
                    marginTop: -12,
                    marginBottom: -8,
                  }}
                >
                  <IconButton>
                    {file?.liked ? (
                      <FavoriteIcon
                        style={{ color: "#d51b1b" }}
                        className="hand"
                        onClick={() => handleLikeBtn(file, idx)}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="hand"
                        onClick={() => handleLikeBtn(file, idx)}
                      />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};
