import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fileLikedApi } from "../../../api/fileLikedApi";
import { IEventFile } from "../../../interfaces/IEvent";
import {
  getClientSelectedFileSelector,
  getWindowWidthSelector,
} from "../../../selectors/selectors";
import { sortedClientGalleryListSelector } from "../../../selectors/sortedClientGalleryListSelector";
import { sortedClientLikedFileListSelector } from "../../../selectors/sortedClientLikedFileListSelector";
import {
  updateClientSelectedFile,
  updateLikedFile,
  updateRemoveClientLikedFile,
} from "../../../slices/client/clientEventSlice";
import { updateLastScrollPosition } from "../../../slices/common/commonSlice";
import { AppDispatch } from "../../../store";

interface IClientGallery {
  likedGallery?: boolean;
}

export const ClientGallery: React.FC<IClientGallery> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const galleryList = props?.likedGallery
    ? useSelector(sortedClientLikedFileListSelector)
    : useSelector(sortedClientGalleryListSelector);
  const getClientSelectedFile = useSelector(getClientSelectedFileSelector);
  const getWindowWidth = useSelector(getWindowWidthSelector);

  const handleFileClick = (file: IEventFile, index: number) => {
    if (!props?.likedGallery) {
      dispatch(updateClientSelectedFile(file));
      dispatch(
        updateLastScrollPosition({ lastScrollPosition: window.pageYOffset })
      );
      navigate("/instaSelect");
    }
  };

  const handleLikeBtn = async (file: IEventFile, idx: number) => {
    const fileLikedObj = {
      eventId: file?.eventId,
      fileId: file?.fileId,
      liked: !file?.liked,
      clientId: file?.clientId,
      clientOwnerId: file?.clientOwnerId,
    };
    dispatch(updateRemoveClientLikedFile(fileLikedObj));
    await fileLikedApi({
      dispatch: dispatch,
      uri: "fileLiked",
      data: fileLikedObj,
    });
  };

  const scrollToPosition = () => {
    if (getClientSelectedFile?.fileId) {
      const element = document.getElementById(getClientSelectedFile?.fileId);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      console.log(getClientSelectedFile?.fileId);
    }
  };

  useEffect(() => {
    scrollToPosition();
  }, []);

  return (
    <Grid container justifyContent="center">
      {getWindowWidth &&
        galleryList?.map((file, idx) => {
          return (
            <Grid item xs={6} md={4} lg={3}>
              {file?.map(
                (file: IEventFile, index: number, arr: IEventFile[]) => {
                  return (
                    <Card
                      style={{
                        marginTop: 5,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                      id={file?.fileId}
                    >
                      <CardActionArea>
                        <LazyLoad
                          height={
                            file?.imgHeight && file?.imgWidth
                              ? (getWindowWidth /
                                  galleryList.length /
                                  file?.imgWidth) *
                                file?.imgHeight
                              : "inherit"
                          }
                          width={getWindowWidth / galleryList.length}
                          offset={50}
                        >
                          <img
                            style={{
                              height: "inherit",
                              width: "inherit",
                              marginBottom: -4,
                            }}
                            src={file?.minFilePath}
                            onClick={() => handleFileClick(file, index)}
                          />
                        </LazyLoad>
                      </CardActionArea>
                      {props?.likedGallery && (
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
                      )}
                    </Card>
                  );
                }
              )}
            </Grid>
          );
        })}
    </Grid>
  );
};
