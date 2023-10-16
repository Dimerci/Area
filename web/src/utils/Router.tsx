import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import HomePage from '../pages/HomePage';
import InsidePage from '../pages/InsidePage';
import ProtectedPage from '../pages/ProtectedPage'; // Assuming you have this component

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Inside" element={<InsidePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
