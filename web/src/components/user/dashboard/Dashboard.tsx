import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientListApi } from "../../../api/getClientListApi";
import { api } from "../../../env";
import {
  getMsgSelector,
  getUserProfileSelector,
  isValidTokenSelector,
} from "../../../selectors/selectors";
import { ClientTiles } from "./ClientTiles";

const url = api;
const token = localStorage.getItem("token");

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <ClientTiles />
      </Grid>
    </Grid>
  );
};
