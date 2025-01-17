import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { routes } from "./utils/routes";
import { Dashboard } from "./pages/Dashboard";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.homePage} element={<Login />} />
        <Route path={routes.loginPage} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.dashboardPage} element={<Dashboard />} />
        </Route>
        <Route path="*" element={<p>404 Not Found Page...</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
