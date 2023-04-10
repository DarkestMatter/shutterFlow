import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { MouseEvent } from "react";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import { fileLikedApi } from "../../../api/fileLikedApi";
import { IEventFile } from "../../../interfaces/IEvent";
import { clientEventFileListSelector } from "../../../selectors/clientEventFileListSelector";
import { updateLikedFile } from "../../../slices/client/clientEventSlice";
import { AppDispatch } from "../../../store";

export const InstaFileBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clientEventFileList = useSelector(clientEventFileListSelector);

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
    fileLiked &&
      dispatch(updateLikedFile({ ...fileLikedObj, liked: !file?.liked }));
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

  return (
    <Grid container>
      {clientEventFileList?.map((file, idx) => {
        return (
          <Card
            onClick={(e) => handleFileClick(e, file, idx)}
            style={{
              marginTop: 5,
              marginLeft: 2,
              marginRight: 2,
            }}
          >
            <CardActionArea>
              <LazyLoad height={"inherit"} width={"inherit"} offset={50}>
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
              style={{ justifyContent: "right", marginRight: 15 }}
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
        );
      })}
    </Grid>
  );
};
