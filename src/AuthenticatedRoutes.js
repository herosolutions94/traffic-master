import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticatedRoutes = () => {
  const authToken = useSelector((state) => state.fetchSignin.authToken);
  let location = useLocation();
  return authToken ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthenticatedRoutes;
