import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
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
      console.group("useAuth");
      console.log(userData);
      console.groupEnd("useAuth");
      dispatch(setCredentials(userData));
      localStorage.setItem("token", userData.token);
      navigate("/dashboard");
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  return { tokenLoading, tokenData, handleLogin, loginLoading };
};
