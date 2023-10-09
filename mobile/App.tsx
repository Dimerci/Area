/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {Auth0Provider, useAuth0} from 'react-native-auth0';
import {LoginButton} from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainPage} from './src/screens/MainPage';
import {SettingsPage} from './src/screens/SettingsPage';
import {Button} from 'react-native-elements';
import LogOutButton from './src/components/Logout';

function App(): JSX.Element {
<<<<<<< HEAD
  const [isSettings, setIsSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  AsyncStorage.getItem('isLoggedIn').then(isLoggedIn => {
    if (isLoggedIn === 'true') {
      console.log('user is logged in');
      setIsLoggedIn(true);
    } else {
      console.log('user is not logged in or cleared app cache');
      setIsLoggedIn(false);
    }
  });

  const toggleSwitch = () => {
    setIsSettings(!isSettings);
  };

=======
  const data = [
    {
      id: 1,
      title: 'Test 1',
      component: <Text>Test</Text>,
      debugConsole: true,
      debugScreen: true,
    },
    {
      id: 2,
      title: 'Button Test',
      component: <Button title="Test" />,
      debugConsole: true,
      debugScreen: false,
    },
    {
      id: 3,
      title: 'Weather',
      component: <WeatherWidget debugScreen />,
      debugConsole: false,
      debugScreen: false,
    },
  ];
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
  return (
    <Auth0Provider
      domain={'dev-zqudvtrv6sw7xe6c.us.auth0.com'}
      clientId={'NrkwXP0voGOWHHerGqC4x0deYPjsxhvq'}>
      <TailwindProvider utilities={utilities}>
        {!isLoggedIn && <LoginButton loginState={setIsLoggedIn} />}
        {isLoggedIn && <LogOutButton loginState={setIsLoggedIn} />}
        {isLoggedIn && !isSettings && <MainPage />}
        {isLoggedIn && isSettings && <SettingsPage />}
        {isLoggedIn && !isSettings && (
          <Button title="Settings Page" onPress={toggleSwitch} />
        )}
        {isLoggedIn && isSettings && (
          <Button title="Home Page" onPress={toggleSwitch} />
        )}
      </TailwindProvider>
    </Auth0Provider>
  );
}

export default App;
