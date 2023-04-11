import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IEvent } from "../../../interfaces/IEvent";
import {
  getSelectedClientSelector,
  getSelectedEventSelector,
} from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { updateSelectedEvent } from "../../../slices/user/eventSlice";
import { AppDispatch } from "../../../store";

export const EventListCol = styled.span`
  margin-top: -10px;
  margin-left: 15px;
  cursor: pointer;
  color: #878583;
  :hover {
    color: #191914;
  }
`;

export const AddEvent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedClient = useSelector(getSelectedClientSelector);
  const getSelectedEvent = useSelector(getSelectedEventSelector);
  const getSelectedClient = useSelector(getSelectedClientSelector);

  const handleAddEvent = () =>
    dispatch(openDialogBox({ dialogName: dialogName.addEventDialog }));

  const handleSelectedEvent = (event: IEvent) => {
    dispatch(updateSelectedEvent(event));
  };

  useEffect(() => {
    if (getSelectedClient?.eventList) {
      dispatch(updateSelectedEvent(getSelectedClient?.eventList[0]));
    }
  }, []);

  return (
    <Grid container style={{ marginTop: 10 }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={12}></Grid>
        </Grid>
        {selectedClient?.eventList?.map((list) => {
          return (
            <Grid
              item
              xs={12}
              style={{
                marginTop: 7,
                borderBottom: "1px solid gainsboro",
                width: 120,
                paddingBottom: 12,
                marginLeft: 10,
                cursor: "pointer",
              }}
              onClick={() => handleSelectedEvent(list)}
            >
              {getSelectedEvent?.eventId === list?.eventId ? (
                <EventListCol style={{ color: "#191914" }}>
                  {list?.eventName}
                </EventListCol>
              ) : (
                <EventListCol>{list?.eventName}</EventListCol>
              )}
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <button onClick={handleAddEvent} className="midBtn centerDiv">
            Add Event
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};
