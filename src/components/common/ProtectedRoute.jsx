import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVerifyToken } from "../../hooks/useVerifyToken";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isLoading, error, success } = useVerifyToken();

  if (!success) {
    const user = useSelector((state) => state.user);

    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  if (isLoading) return;
  if (error) throw new Error("Internal Error, Please Reload");
  return <Outlet />;
};

export { ProtectedRoute };
