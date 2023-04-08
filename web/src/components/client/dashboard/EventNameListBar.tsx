import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientEventDataApi } from "../../../api/getClientEventDataApi";
import { IEvent } from "../../../interfaces/IEvent";
import {
  getClientEventNameListSelector,
  getClientProfileSelector,
  getClientSelectedEventSelector,
} from "../../../selectors/selectors";
import { updateClientSelectedEvent } from "../../../slices/client/clientEventSlice";
import { AppDispatch } from "../../../store";

export const EventNameListBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getClientEventNameList = useSelector(getClientEventNameListSelector);
  const getClientProfile = useSelector(getClientProfileSelector);
  const getClientSelectedEvent = useSelector(getClientSelectedEventSelector);

  const handleEventClick = async (event: IEvent) => {
    if (getClientSelectedEvent?.eventId !== event?.eventId) {
      await getClientEventDataApi({
        dispatch: dispatch,
        uri: "getClientEventData",
        data: {
          clientId: getClientProfile?.clientId,
          eventId: event?.eventId,
        },
      });
      dispatch(updateClientSelectedEvent(event));
    }
  };

  useEffect(() => {
    if (getClientEventNameList) {
      dispatch(updateClientSelectedEvent(getClientEventNameList[0]));
    }
  }, [getClientEventNameList]);

  return (
    <Grid container>
      <ul
        style={{ whiteSpace: "nowrap", overflowX: "auto", cursor: "pointer" }}
      >
        {getClientEventNameList?.map((event) => {
          return (
            <li
              className={
                getClientSelectedEvent?.eventId === event?.eventId
                  ? "overFlowSelectedEventName"
                  : "overFlowEventNameList"
              }
              onClick={() => handleEventClick(event)}
            >
              {event?.eventName}
            </li>
          );
        })}
      </ul>
    </Grid>
  );
};
