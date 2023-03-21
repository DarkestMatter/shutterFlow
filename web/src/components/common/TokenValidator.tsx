import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidTokenSelector } from "../../selectors/selectors";
import { AppDispatch } from "../../store";
import { validateTokenThunk } from "../../thunk/validTokenThunk";

export const TokenValidator: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isValidToken = useSelector(isValidTokenSelector);

  const getToken = async () => {
    await dispatch(
      validateTokenThunk({
        uri: "validateToken",
        data: {},
      })
    );
    if (isValidToken) {
      navigate(location.pathname);
    } else if (isValidToken === false) {
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
