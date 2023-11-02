import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherSearchBox from '../components/WeatherSearchBox';
import ServiceBox from '../components/ServiceBox';
import { sendUserIdDb } from '../components/connectionDB';

const InsidePage: React.FC = () => {
  const { logout, user, isAuthenticated } = useAuth0();

  const [showWeatherBox, setShowWeatherBox] = useState(false);
  const [showServiceBox, setShowServiceBox] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showSetParamsButton, setShowSetParamsButton] = useState(false);
  const [selectedButton, setSelectedButton] = useState('AREA'); // Initialize to 'AREA'
  if (user && user.email) {
    console.log("Yeah")
    const dbResult = sendUserIdDb(user.email);
  }

  return (
    <div className="flex flex-col h-screen">
      {isAuthenticated && (
        <button onClick={() => logout()}>
          Logout
        </button>
      )}
      {isAuthenticated && user && <div>Welcome, {user.email}</div>}
      {/* Top Bar */}
      <div className="bg-blue-500 p-4 shadow-md shadow-2xl rounded-b-lg flex justify-between items-center">
        <a href="http://localhost:8081/">
          <button
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className={`text-6xl font-bold tracking-wider ${selectedButton === 'AREA' ? 'text-green-500' : 'text-white'}`}
            onClick={() => {
              setShowServiceBox(true);
              setSelectedButton('AREA');
            }}
          >
            AREA
          </button>
        </a>
        <button
          style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          className={`text-6xl font-bold tracking-wider ${selectedButton === 'Create' ? 'text-teal-500' : 'text-white'}`}
          onClick={() => {
            setShowServiceBox(true);
            setSelectedButton('Create');
          }}
        >
          Create
        </button>
      </div>

      {showServiceBox && (
        <div className="p-4">
          <ServiceBox
            selectedService={selectedService}
            onSelectService={(service) => {
              setSelectedService(service);
            }}
            onSetupParameters={() => setShowWeatherBox(true)}
          />
        </div>
      )}

      {showWeatherBox && <WeatherSearchBox />}
      <div className="flex-grow">
        {/* Other content goes here */}
      </div>
    </div>
  );
};

export default InsidePage;
