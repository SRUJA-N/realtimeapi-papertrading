// ------------------------------
// REACT IMPORTS
// ------------------------------
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
// Navigate: Redirects user to a different route
// Outlet: Renders nested routes inside a parent route

// ------------------------------
// PROTECTED ROUTE COMPONENT
// ------------------------------
const ProtectedRoute = () => {
  // Check if JWT token exists in localStorage
  const token = localStorage.getItem('token');

  // If token exists, render the nested route (Outlet)
  // Otherwise, redirect user to the login/signup page
  return token ? <Outlet /> : <Navigate to="/" />;
};

// Export the component for use in routing
export default ProtectedRoute;
