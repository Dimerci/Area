// src/App.tsx
import React from 'react';
import HelloWorld from './components/HelloWorld';
import './theme/light-theme.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <HelloWorld />
    </div>
  );
}

export default App;
