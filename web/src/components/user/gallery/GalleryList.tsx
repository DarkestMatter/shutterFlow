import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import { getEventDataApi } from "../../../api/getEventDataApi";
import { IEventFile } from "../../../interfaces/IEvent";
import {
  getEventFileListSelector,
  getSelectedEventSelector,
  getSelectFileEnabledSelector,
} from "../../../selectors/selectors";
import { showEventGallerySelector } from "../../../selectors/showEventGallerySelector";
import { selectFile } from "../../../services/enum";
import { updateSelectedFile } from "../../../slices/user/eventSlice";
import { AppDispatch } from "../../../store";

export const GalleryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const showEventGallery = useSelector(showEventGallerySelector);
  const getSelectedEvent = useSelector(getSelectedEventSelector);
  const getEventFileList = useSelector(getEventFileListSelector);
  const getSelectFileEnabled = useSelector(getSelectFileEnabledSelector);

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

  const handleFileClick = (file: IEventFile, index: number) => {
    dispatch(
      updateSelectedFile({
        fileId: file?.fileId,
        index: index,
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
    }
  }, [showEventGallery, getSelectedEvent?.eventId]);

  return (
    <Grid container justifyContent="center">
      {showEventGallery &&
        getEventFileList?.map((file: IEventFile, index: number) => {
          return (
            <Card
              onClick={() => handleFileClick(file, index)}
              style={{
                width: 150,
                margin: 5,
                border: `${
                  getSelectFileEnabled
                    ? getSelectFileEnabled === selectFile.one && !file?.selected
                      ? "5px solid blue"
                      : "15px solid red"
                    : "none"
                }`,
              }}
            >
              <CardActionArea>
                <LazyLoad height={150} width={150} offset={150}>
                  <CardMedia
                    component="img"
                    image={file?.minFilePath}
                    alt="green iguana"
                    style={{ height: 150 }}
                  />
                </LazyLoad>
              </CardActionArea>
            </Card>
          );
        })}
    </Grid>
  );
};
