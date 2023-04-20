import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import { getEventDataApi } from "../../../api/getEventDataApi";
import { getLikedFilesApi } from "../../../api/getLikedFilesApi";
import { IEventFile } from "../../../interfaces/IEvent";
import {
  getClientLikedFileListSelector,
  getEventFileListSelector,
  getSelectedClientSelector,
  getSelectedEventSelector,
} from "../../../selectors/selectors";
import { showEventGallerySelector } from "../../../selectors/showEventGallerySelector";
import { lazyLoadOffset } from "../../../services/enum";
import { updateSelectedFile } from "../../../slices/user/eventSlice";
import { AppDispatch } from "../../../store";
import { LikedFileListHeader } from "./LikedFileListHeader";

export const GalleryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getSelectedClient = useSelector(getSelectedClientSelector);
  const showEventGallery = useSelector(showEventGallerySelector);
  const getSelectedEvent = useSelector(getSelectedEventSelector);
  const getEventFileList = useSelector(getEventFileListSelector);
  const getClientLikedFileList = useSelector(getClientLikedFileListSelector);
  const galleryFileList = getEventFileList
    ? getEventFileList
    : getClientLikedFileList;

  const getEventData = async () => {
    await getEventDataApi({
      dispatch: dispatch,
      uri: "getEventData",
      data: {
        eventId: getSelectedEvent?.eventId,
        clientId: getSelectedEvent?.clientId,
      },
    });
  };

  const getClientLikedFile = async () => {
    await getLikedFilesApi({
      dispatch: dispatch,
      uri: "getLikedFilesUser",
      data: { clientId: getSelectedClient?.clientId },
    });
  };

  const handleFileClick = (file: IEventFile, index: number) => {
    dispatch(
      updateSelectedFile({
        fileId: file?.fileId,
        clientId: file?.clientId,
        clientOwnerId: file?.clientOwnerId,
        selected: !file?.selected,
        eventId: file?.eventId,
      })
    );
  };

  useEffect(() => {
    if (getSelectedEvent?.eventId && showEventGallery) {
      getEventData();
    } else if (!getSelectedEvent?.eventId) {
      getClientLikedFile();
    }
  }, [showEventGallery, getSelectedEvent?.eventId]);

  return (
    <Grid container justifyContent="center">
      {!getSelectedEvent?.eventName && <LikedFileListHeader />}
      {showEventGallery &&
        galleryFileList?.map((file: IEventFile, index: number) => {
          return (
            <Card
              onClick={() => handleFileClick(file, index)}
              style={{
                width: 150,
                margin: 5,
              }}
            >
              <CardActionArea>
                <LazyLoad
                  height={150}
                  width={150}
                  offset={lazyLoadOffset.offset}
                >
                  <CardMedia
                    component="img"
                    image={file?.minFilePath}
                    alt="green iguana"
                    style={{ height: 150 }}
                  />
                </LazyLoad>
              </CardActionArea>
              {file?.selected && <CheckCircleOutlineIcon />}
            </Card>
          );
        })}
    </Grid>
  );
};
