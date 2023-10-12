import React from 'react';
import WeatherSearchBox from '../components/WeatherSearchBox';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <WeatherSearchBox />
      <a href="http://localhost:8080/login">
        <button>Login</button>
      </a>
    </div>
  );
};

export default HomePage;
