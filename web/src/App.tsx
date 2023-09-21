// src/App.tsx
import React from 'react';
import HelloWorld from './components/HelloWorld';
import './theme/light-theme.css'; // Import light theme

const App: React.FC = () => {
  return (
    <div className="App">
      <HelloWorld />
    </div>
  );
}

export default App;
