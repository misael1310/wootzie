import { useDispatch } from "react-redux";
import { useRefreshTokenQuery } from "../features/auth/authApi";
import { logOut, setCredentials } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

const useRefreshToken = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useRefreshTokenQuery();

  useEffect(() => {
    if (!!data?.token && !!data?.user) {
      setSuccess(true);
      dispatch(setCredentials({ user: { data }, token: { data } }));
    }
  }, [data, error, isLoading, dispatch]);

  return { isLoading, error, success };
};

export { useRefreshToken };
