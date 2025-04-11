// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure correct path

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Renders the nested route component (e.g., DashboardPage)
  return <Outlet />;
};

export default ProtectedRoute;
