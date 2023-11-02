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
import {LoginButton} from './src/components/utils/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainPage} from './src/screens/MainPage';
import {SettingsPage} from './src/screens/SettingsPage';
import {Button} from 'react-native-elements';
import LogOutButton from './src/components/utils/Logout';

function App(): JSX.Element {
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
