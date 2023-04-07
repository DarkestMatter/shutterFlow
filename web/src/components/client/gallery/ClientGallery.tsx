import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { IEventFile } from "../../../interfaces/IEvent";
import { sortedClientGalleryListSelector } from "../../../selectors/sortedClientGalleryListSelector";

export const ClientGallery: React.FC = () => {
  const sortedClientGalleryList = useSelector(sortedClientGalleryListSelector);

  const handleFileClick = (file: IEventFile, index: number) => {};

  return (
    <Grid container justifyContent="center">
      {sortedClientGalleryList.map((file) => {
        return (
          <Grid item xs={6} md={4} lg={3}>
            {file?.map((file: IEventFile, index: number, arr: IEventFile[]) => {
              return (
                <Card
                  onClick={() => handleFileClick(file, index)}
                  style={{
                    marginTop: 5,
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  <CardActionArea>
                    <LazyLoadImage
                      src={file?.minFilePath}
                      style={{
                        height: "inherit",
                        width: "inherit",
                        marginBottom: -4,
                      }}
                    ></LazyLoadImage>
                  </CardActionArea>
                </Card>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};
