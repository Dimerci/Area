import React from 'react';
import backgroundImage from '../assets/light.png';
import { useAuth0 } from '@auth0/auth0-react';

const HomePage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="bg-center bg-no-repeat bg-cover h-screen w-screen flex justify-center items-center"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Content container */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl text-black font-semibold mb-4">Automate your digital life</h1>
        <button
          onClick={() => loginWithRedirect()} 
          className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-gray-700 transition-colors duration-300">
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
