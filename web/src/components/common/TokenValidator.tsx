import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateTokenApi } from "../../api/validateTokenApi";
import { currentProfileTypeSelector } from "../../selectors/currentProfileSelector";
import {
  getUserProfileSelector,
  isValidTokenSelector,
} from "../../selectors/selectors";
import { customerType } from "../../services/enum";
import { AppDispatch } from "../../store";

export const TokenValidator: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isValidToken = useSelector(isValidTokenSelector);
  const currentProfileType = useSelector(currentProfileTypeSelector);

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
      if (currentProfileType === customerType.user) {
        navigate("/dashboard");
      } else if (currentProfileType === customerType.client) {
        navigate("/client");
      } else {
        navigate("login");
      }
    }
  }, [isValidToken]);

  return <></>;
};
