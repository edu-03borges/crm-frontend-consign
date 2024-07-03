import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from 'utils';

import MainLayout from "layout/MainLayout";

const ProtectedRoute = () => {
  const isAuthenticated = !!getToken();

  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export default ProtectedRoute;