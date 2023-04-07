import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IEventFile } from "../../../interfaces/IEvent";
import { getClientEventFileListSelector } from "../../../selectors/selectors";
import { sortedClientGalleryListSelector } from "../../../selectors/sortedClientGalleryListSelector";
import { imgDimensionType } from "../../../services/enum";

export const ClientGallery: React.FC = () => {
  const sortedClientGalleryList = useSelector(sortedClientGalleryListSelector);

  const handleFileClick = (file: IEventFile, index: number) => {};

  useEffect(() => {}, []);

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
                    <CardMedia
                      component="img"
                      image={file?.minFilePath}
                      alt="green iguana"
                    />
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
