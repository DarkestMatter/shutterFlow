import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AddClientDialogBox } from "./AddClientDialogBox";

const clientList = [
  {
    clientName: "Satish",
    tileImgUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
  },
  {
    clientName: "Satish",
    tileImgUrl:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/Types-Of-Portrait-Photography-BW.jpg",
  },
  {
    clientName: "Satish",
    tileImgUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
  },
  {
    clientName: "Satish",
    tileImgUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
  },
  {
    clientName: "Satish",
    tileImgUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
  },
  {
    clientName: "Satish",
    tileImgUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
  },
];

export const ClientTiles: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddClient = () =>
    dispatch(openDialogBox({ dialogName: dialogName.addClientDialog }));

  return (
    <Grid container spacing={5}>
      <AddClientDialogBox />
      <Grid item xs={6} sm={3} md={4} xl={3}>
        <Card onClick={handleAddClient}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={
                "https://icons-for-free.com/download-icon-add+photo+plus+upload+icon-1320184050039319890_512.png"
              }
              alt="green iguana"
              style={{ height: 150 }}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                <b>Add New Client</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {clientList.map((client) => {
        return (
          <Grid item xs={6} sm={3} md={4} xl={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={client.tileImgUrl}
                  alt="green iguana"
                  style={{ height: 150 }}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {client.clientName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
      {/* <Grid item xs={6} sm={3} md={4} xl={3}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKH4MKZE1FKM06xehvRk2ii26sxzfRudNZpopv1INZ04_aQ7SfLhyyxwQJKk6olxgDPo&usqp=CAU"
              }
              alt="green iguana"
              style={{ height: 150 }}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                <b>See All Clients</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid> */}
    </Grid>
  );
};
