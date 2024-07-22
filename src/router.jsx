import { BrowserRouter, Route, Routes } from "react-router-dom";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>HomePage</p>} />
        <Route path="*" element={<p>404 Not Found Page...</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
