import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import LazyLoad from "react-lazy-load";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IEventFile } from "../../../interfaces/IEvent";
import { sortedClientGalleryListSelector } from "../../../selectors/sortedClientGalleryListSelector";
import { AppDispatch } from "../../../store";

export const ClientGallery: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const sortedClientGalleryList = useSelector(sortedClientGalleryListSelector);

  const handleFileClick = (file: IEventFile, index: number) => {
    navigate("/instaSelect");
  };

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
                    {/* <CardMedia
                      component="img"
                      image={file?.minFilePath}
                      alt="green iguana"
                      style={{
                        height: "inherit",
                        width: "inherit",
                        marginBottom: -4,
                      }}
                    /> */}
                    <LazyLoad height={"inherit"} width={"inherit"} offset={50}>
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
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};
