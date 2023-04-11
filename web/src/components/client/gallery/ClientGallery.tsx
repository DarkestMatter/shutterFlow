import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IEventFile } from "../../../interfaces/IEvent";
import {
  getClientSelectedFileSelector,
  getLastScrollPositioneSelector,
  getWindowWidthSelector,
} from "../../../selectors/selectors";
import { sortedClientGalleryListSelector } from "../../../selectors/sortedClientGalleryListSelector";
import { sortedClientLikedFileListSelector } from "../../../selectors/sortedClientLikedFileListSelector";
import { imgDimensionType } from "../../../services/enum";
import { updateClientSelectedFile } from "../../../slices/client/clientEventSlice";
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
    dispatch(updateClientSelectedFile(file));
    dispatch(
      updateLastScrollPosition({ lastScrollPosition: window.pageYOffset })
    );
    navigate("/instaSelect");
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
        galleryList?.map((file) => {
          return (
            <Grid item xs={6} md={4} lg={3}>
              {file?.map(
                (file: IEventFile, index: number, arr: IEventFile[]) => {
                  return (
                    <Card
                      onClick={() => handleFileClick(file, index)}
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
                          />
                        </LazyLoad>
                      </CardActionArea>
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
