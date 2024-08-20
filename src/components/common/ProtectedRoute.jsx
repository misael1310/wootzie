import { Navigate, Outlet } from "react-router-dom";
import { useVerifyToken } from "../../hooks/useVerifyToken";
import { routes } from "../../utils/routes";

const ProtectedRoute = ({ redirectPath = routes.loginPage }) => {
  const { isLoading, error, success } = useVerifyToken();

  if (isLoading) return;
  if (!success) {
    return <Navigate to={redirectPath} replace />;
  }

  if (error) {
    console.log(error);
  }
  return <Outlet />;
};

export { ProtectedRoute };
