import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVerifyToken } from "../../hooks/useVerifyToken";
import { routes } from "../../utils/routes";

const ProtectedRoute = ({ redirectPath = routes.loginPage }) => {
  const { isLoading, error, success } = useVerifyToken();

  if (isLoading) return;
  if (!success) {
    const user = useSelector((state) => state.user);

    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  if (error) throw new Error("Internal Error, Please Reload");
  return <Outlet />;
};

export { ProtectedRoute };
