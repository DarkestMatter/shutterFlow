import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientListApi } from "../../../api/getClientListApi";
import { IClientData } from "../../../interfaces/IClient";
import {
  getClientListSelector,
  getMsgSelector,
  getUserProfileSelector,
  isValidTokenSelector,
} from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { updateSelectedClient } from "../../../slices/user/clientMgmtSlice";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AddClientDialogBox } from "./AddClientDialogBox";

export const ClientTiles: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMsg = useSelector(getMsgSelector);
  const getUser = useSelector(getUserProfileSelector);
  const isValidToken = useSelector(isValidTokenSelector);
  const clientList = useSelector(getClientListSelector);

  const getClientList = async () => {
    await getClientListApi({
      dispatch: dispatch,
      uri: "getClientList",
      data: { email: getUser.email },
    });
  };

  useEffect(() => {
    if (isValidToken) {
      getClientList();
    }
  }, [isValidToken]);

  const handleAddClient = () =>
    dispatch(openDialogBox({ dialogName: dialogName.addClientDialog }));

  const handleClientClicked = (client: IClientData) => {
    dispatch(updateSelectedClient(client));
    navigate("/eventDashboard");
  };

  return (
    <Grid container spacing={3}>
      <AddClientDialogBox />
      <Grid item xs={6} sm={3} md={4} xl={3}>
        <div>
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
                  <b>Add Client</b>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Grid>
      {clientList?.map((client) => {
        return (
          <Grid item xs={6} sm={3} md={4} xl={3} key={client?.clientId}>
            <div>
              <Card onClick={() => handleClientClicked(client)}>
                <CardActionArea>
                  {client?.tileImgUrl ? (
                    <CardMedia
                      component="img"
                      image={client?.tileImgUrl}
                      alt="No image Uploaded"
                      style={{ height: 150 }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      image={
                        "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                      }
                      alt="No image Uploaded"
                      style={{ height: 150 }}
                    />
                  )}
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {client?.clientName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
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
