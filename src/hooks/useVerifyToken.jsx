import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useVerifyTokenQuery } from "../features/auth/authApi";
import { logOut } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const useVerifyToken = () => {
  const dispatch = useDispatch();
  // Get Access token from memory (Redux State)
  const token = useSelector((state) => state.auth.token);

  const { data, error, isLoading } = useVerifyTokenQuery(token);

  useEffect(() => {
    if (!token || error) {
      dispatch(logOut());
    }
  }, [token, data, error, dispatch]);

  const success = !token ? false : !!data;

  return { isLoading, error, success };
};

export { useVerifyToken };
