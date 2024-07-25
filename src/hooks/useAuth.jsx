import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useVerifyTokenQuery,
  useLoginMutation,
} from "../features/auth/authApi";
import { logOut, setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useVerifyTokenQuery(undefined, {
    skip: !token,
  });

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  useEffect(() => {
    if (!token) {
      dispatch(logOut());
      return;
    }

    if (tokenError) {
      dispatch(logOut());
    } else if (tokenData) {
      dispatch(
        setCredentials({
          user: tokenData.user,
          token,
        })
      );
      return navigate("/dashboard");
    }
  }, [token, tokenData, tokenError, dispatch]);

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

  return { tokenLoading, handleLogin, loginLoading };
};
