import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const CandidateRoutes = () => {
    let location = useLocation();
  const memType = localStorage.getItem('memType');

  return memType == 'candidate' ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default CandidateRoutes;
