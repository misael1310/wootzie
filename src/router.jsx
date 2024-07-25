import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<p>Dashboard...</p>} />
        </Route>
        <Route path="*" element={<p>404 Not Found Page...</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
