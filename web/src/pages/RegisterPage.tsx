import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the username and password to your authentication service
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="register-page" style={{ maxWidth: '300px', margin: 'auto', padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* ... other input fields ... */}
        <label style={{ marginBottom: '0.5rem' }}>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginTop: '0.25rem' }}
          />
        </label>
        <button type="submit" style={{ cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
