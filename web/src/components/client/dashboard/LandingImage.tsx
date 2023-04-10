import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientPrimaryEventApi } from "../../../api/getClientPrimaryEventApi";
import { landingImageDataSelector } from "../../../selectors/landingImgSelector";
import {
  getClientProfileSelector,
  isValidTokenSelector,
} from "../../../selectors/selectors";
import { updateScreenType } from "../../../slices/common/commonSlice";
import { AppDispatch } from "../../../store";

export const LandingImage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getClientProfile = useSelector(getClientProfileSelector);
  const isValidToken = useSelector(isValidTokenSelector);
  const getLandingImageData = useSelector(landingImageDataSelector);

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
    if (isValidToken && !getLandingImageData) {
      getPrimaryEvent();
    }
    windowHeight > windowWidth
      ? dispatch(updateScreenType({ isMobileScreen: true }))
      : dispatch(updateScreenType({ isMobileScreen: false }));
    window.scrollTo(0, 0);
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
