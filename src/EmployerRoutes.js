import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const EmployerRoutes = () => {
    let location = useLocation();
    const memType = localStorage.getItem('memType');

  return memType == 'employer' ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default EmployerRoutes;
