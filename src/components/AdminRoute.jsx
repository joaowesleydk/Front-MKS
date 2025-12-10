import React from 'react';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user?.role === 'admin';

    if (!isAdmin) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return <Navigate to="/login" replace />;
  }
};