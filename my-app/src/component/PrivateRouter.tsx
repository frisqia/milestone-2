import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRouter() {
  const isLogin = localStorage.getItem("token") !== null;
  return isLogin ? <Outlet /> : <Navigate to="/Dashboard" />;
}
export default PrivateRouter;
