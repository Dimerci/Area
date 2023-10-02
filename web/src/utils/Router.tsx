import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/ProtectedPage';

const AppRouter: React.FC = () => {
  const isAuthenticated = false; // Replace with your actual authentication logic

  useEffect(() => {
    if (!isAuthenticated) {
      // If the user is not authenticated, navigate them to the login page
      <Navigate to="/login" replace />;
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/protected" element={<ProtectedRoute><ProtectedPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
