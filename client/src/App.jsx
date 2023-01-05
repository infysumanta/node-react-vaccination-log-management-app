import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
