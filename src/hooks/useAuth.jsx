import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useLazyLogOutQuery } from "../features/auth/authApi";
import { setCredentials, logOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { routes } from "../utils/routes";
import { useVerifyToken } from "./useVerifyToken";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading: tokenLoading,
    error: tokenError,
    success: tokenData,
  } = useVerifyToken();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [triggerLogOut, { isLoading: logOutLoading, error: logOutError }] =
    useLazyLogOutQuery();

  useEffect(() => {
    if (tokenData) navigate(routes.dashboardPage);
  }, [tokenLoading, tokenError, tokenData]);

  const handleLogin = async (values) => {
    const data = {
      Email: values.username,
      Password: values.password,
    };
    try {
      const userData = await login(data).unwrap();
      console.group("useAuth - handleLogin");
      console.groupEnd("useAuth - handleLogin");
      dispatch(setCredentials(userData));
      navigate(routes.dashboardPage);
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const handleLogOut = async () => {
    try {
      const result = await triggerLogOut().unwrap();
      navigate(routes.loginPage);
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };

  return { tokenLoading, tokenData, loginLoading, handleLogin, handleLogOut };
};
