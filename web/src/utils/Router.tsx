import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/ProtectedPage'; // Assuming you have this component

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAuthenticated ? (
          <Route path="/protected" element={<ProtectedRoute><ProtectedPage /></ProtectedRoute>} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
