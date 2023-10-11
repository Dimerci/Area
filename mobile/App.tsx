/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {TailwindProvider, useTailwind} from 'tailwind-rn';
import utilities from './tailwind.json';
import {MainPage} from './src/screens/MainPage';
import {SettingsPage} from './src/screens/SettingsPage';
import {Button} from 'react-native-elements';

function App(): JSX.Element {
  const [isSettings, setIsSettings] = useState(false);

  const toggleSwitch = () => {
    setIsSettings(!isSettings);
  };
  return (
    <TailwindProvider utilities={utilities}>
      {!isSettings && <MainPage />}
      {isSettings && <SettingsPage />}
      {!isSettings && <Button title="Settings Page" onPress={toggleSwitch} />}
      {isSettings && <Button title="Home Page" onPress={toggleSwitch} />}
    </TailwindProvider>
  );
}

export default App;
