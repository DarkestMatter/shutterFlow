import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateTokenApi } from "../../api/validateTokenApi";
import {
  getUserProfileSelector,
  isValidTokenSelector,
} from "../../selectors/selectors";
import { AppDispatch } from "../../store";

export const TokenValidator: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isValidToken = useSelector(isValidTokenSelector);

  const getToken = async () => {
    const apiResp = await validateTokenApi({
      dispatch: dispatch,
      uri: "validateToken",
      data: {},
    });
    if (apiResp) {
      navigate(location.pathname);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isValidToken) {
      getToken();
    } else {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/dashboard");
      } else {
        navigate(location.pathname);
      }
    }
  }, [isValidToken]);

  return <></>;
};
