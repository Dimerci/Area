import React, { useState, useEffect, createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherSearchBox from '../components/WeatherSearchBox';
import ServiceBox from '../components/ServiceBox';
import { sendUserIdDb } from '../components/connectionDB';
import { Action, ActionCardProps, ActionCard } from '../components/ActionCard';

const InsidePage: React.FC = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const [dbResult, setDbResult] = useState<ActionCardProps>();
  const [showWeatherBox, setShowWeatherBox] = useState(false);
  const [showServiceBox, setShowServiceBox] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedButton, setSelectedButton] = useState('AREA');

  useEffect(() => {
    if (user && user.email) {
      sendUserIdDb(user.email)
        .then((result) => {
            if (result.data) {
                setDbResult(result.data);
            } else {
                console.error("API returned an error:", result.error);
            }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user]);

  console.log("InsidePage data = " + JSON.stringify(dbResult))


  return (
    <div className="flex flex-col h-screen">
      {isAuthenticated && (
        <button onClick={() => logout()}>
          Logout
        </button>
      )}
      {isAuthenticated && user && <div>Welcome, {user.email}</div>}
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
      {showWeatherBox && <WeatherSearchBox/>}

        <div className="flex-grow">
            {dbResult?.data ? (
                dbResult.data.map((dataObject: Action, dataIndex: number) => {
                    return (
                      <div key={dataIndex}>
                          <ActionCard data={[dataObject]} />
                      </div>
                    );
            })
            ) : (
                <p>Invalid dbResult</p>
            )}
        </div>
    </div>
  );
};

export default InsidePage;
