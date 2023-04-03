import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { IEventFile } from "../../../interfaces/IEvent";
import { getClientGalleryEventListSelector } from "../../../selectors/getClientGalleryEventListSelector";

export const ClientGallery: React.FC = () => {
  const getEventFileList = useSelector(getClientGalleryEventListSelector);

  const handleFileClick = (file: IEventFile, index: number) => {};

  return (
    <Grid container justifyContent="center">
      {getEventFileList?.map((file: IEventFile, index: number) => {
        return (
          <div>
            <Card
              onClick={() => handleFileClick(file, index)}
              style={{
                width: 150,
                margin: 5,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={file?.minFilePath}
                  alt="green iguana"
                  style={{ height: 150 }}
                />
              </CardActionArea>
            </Card>
          </div>
        );
      })}
    </Grid>
  );
};
