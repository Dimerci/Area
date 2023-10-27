import React from 'react';
import backgroundImage from './light.png';

const HomePage: React.FC = () => {
  return (
    <div className="bg-center bg-no-repeat bg-cover h-screen w-screen flex justify-center items-center"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Content container */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl text-black font-semibold mb-4">Automate your digital life</h1>
        <a href="http://localhost:8080/login">
          <button className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-gray-700 transition-colors duration-300">Login</button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
