import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import HomePage from '../pages/HomePage';
import InsidePage from '../pages/InsidePage';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth0();

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
