import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the username and password to your authentication service
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-page" style={{ maxWidth: '300px', margin: 'auto', padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '0.5rem' }}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginTop: '0.25rem' }}
          />
        </label>
        <label style={{ marginBottom: '0.5rem' }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: '0.25rem' }}
          />
        </label>
        <button type="submit" style={{ cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
