import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientPrimaryEventApi } from "../../../api/getClientPrimaryEventApi";
import {
  getClientProfileSelector,
  getLandingImageDataSelector,
  isValidTokenSelector,
} from "../../../selectors/selectors";
import { AppDispatch } from "../../../store";

export const LandingImage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getClientProfile = useSelector(getClientProfileSelector);
  const isValidToken = useSelector(isValidTokenSelector);
  const getLandingImageData = useSelector(getLandingImageDataSelector);

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const getPrimaryEvent = async () => {
    await getClientPrimaryEventApi({
      dispatch: dispatch,
      uri: "getPrimaryEvent",
      data: {
        clientId: getClientProfile?.clientId,
      },
    });
  };

  useEffect(() => {
    if (isValidToken) {
      getPrimaryEvent();
    }
  }, [isValidToken]);

  const ImgBox = styled.div`
    background-image: url("${getLandingImageData?.minFilePath}");
    height: ${windowHeight}px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `;
  return (
    <Grid container>
      <Grid item xs={12}>
        <ImgBox></ImgBox>
      </Grid>
    </Grid>
  );
};
