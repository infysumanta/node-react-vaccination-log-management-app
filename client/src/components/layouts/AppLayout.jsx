import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      const res = await isAuthenticated();
      if (!res) return navigate("/login");
    };
    checkToken();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
