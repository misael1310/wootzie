import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useVerifyTokenQuery } from "../features/auth/authApi";
import { logOut, setCredentials } from "../features/auth/authSlice";

const useVerifyToken = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { data, error, isLoading } = useVerifyTokenQuery(undefined, {
    skip: !token, // Omite la consulta si no hay token
  });

  useEffect(() => {
    if (!token) {
      dispatch(logOut());
      return;
    }

    if (error) {
      dispatch(logOut());
    } else if (data) {
      dispatch(
        setCredentials({
          user: data.user,
          token,
        })
      );
    }
  }, [token, data, error, dispatch]);

  return { isLoading, error, success: !!data };
};

export { useVerifyToken };
