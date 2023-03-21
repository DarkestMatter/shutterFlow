import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../../env";
import {
  getMsgSelector,
  getUserProfileSelector,
  isValidTokenSelector,
} from "../../../selectors/selectors";
import { AppDispatch } from "../../../store";
import { getClientListThunk } from "../../../thunk/getClientListThunk";
import { validateTokenThunk } from "../../../thunk/validTokenThunk";
import { ClientTiles } from "./ClientTiles";

const url = api;
const token = localStorage.getItem("token");

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getMsg = useSelector(getMsgSelector);
  const getUser = useSelector(getUserProfileSelector);
  const isValidToken = useSelector(isValidTokenSelector);

  const getClientList = async () => {
    await dispatch(
      getClientListThunk({
        uri: "getClientList",
        data: { email: getUser.email, userId: getUser.userId },
      })
    );
    !getMsg.errorMsg ? navigate("/eventDashboard") : null;
  };

  useEffect(() => {}, []);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <ClientTiles />
      </Grid>
    </Grid>
  );
};
