import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<p>404 Not Found Page...</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
