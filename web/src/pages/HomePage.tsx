import React from 'react';
import WeatherSearchBox from '../components/WeatherSearchBox';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <a href="http://localhost:8080/login">
        <button>Login</button>
      </a>
      <h1 className="mb-4 text-xl text-black font-semibold">Home Page</h1>
        <WeatherSearchBox />
        <WeatherSearchBox />
    </div>
  );
};

export default HomePage;
