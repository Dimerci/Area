import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';

const App: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isAuthenticated && <LogInButton />}
        {isAuthenticated && <LogOutButton />}
        {isAuthenticated && user?.email}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
