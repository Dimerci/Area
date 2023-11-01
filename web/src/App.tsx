import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogOutButton from './LogOutButton';
import HomePage from './pages/HomePage';
import LoginPage from './pages/InsidePage';
import InsidePage from './pages/InsidePage';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if(isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="App">
        { !isAuthenticated && <HomePage /> }  {/* Show HomePage if not authenticated */}
        { isAuthenticated && <LogOutButton /> && <InsidePage />}
        { isAuthenticated && user && user.email }
    </div>
  );
}

export default App;
