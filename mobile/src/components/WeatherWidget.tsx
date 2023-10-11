<<<<<<< HEAD
import {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from './ReactionList';
import {NormalDropdown} from './Dropdown';
import {WeatherData} from './Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import React, {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from './ReactionList';
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)

type WeatherWidgetT = {
  children?: React.ReactNode; // Define children prop
};

<<<<<<< HEAD
export function WeatherWidget({}: WeatherWidgetT): JSX.Element {
=======
export function WeatherWidget({
  debugScreen,
  debugConsole,
}: WeatherWidgetT): JSX.Element {
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
  const tailwind = useTailwind();
  const [city, setCity] = useState('');
  const [forecastType, setForecastType] = useState('Temperature');
  const [forecastValue, setForecastValue] = useState('');
  const [forecastOptionValue, setForecastOptionValue] = useState('=');
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);

  const handleInputChange = inputText => {
    setCity(inputText);
  };
  const forecastTypeOptions = [
    {label: 'Temperature', value: 'temperature'},
    {label: 'Wind', value: 'wind'},
    {label: 'Humidity', value: 'humidity'},
  ];
  const handleForecastTypeChange = value => {
    setForecastType(value.value);
  };
  const handleForecastValueChange = value => {
    setForecastValue(value);
  };
  const handleForecastValueOptionsChange = value => {
    setForecastOptionValue(value.value);
  };
  const forecastValueOptions = [
    {label: 'Equal', value: '='},
    {label: 'Greater Than', value: '>'},
    {label: 'Lesser Than', value: '<'},
  ];

  const weatherData: WeatherData = {
    city,
    forecast: {
      type: forecastType as 'temperature' | 'wind' | 'humidity',
      value: Number(forecastValue),
    },
    interval: forecastOptionValue as '=' | '<' | '>',
  };

  useEffect(() => {
    AsyncStorage.getItem('WeatherdebugConsole')
      .then(debugConsole => {
        if (debugConsole !== null) {
          setDebugConsole(debugConsole === 'true'); // Convert the stored string to a boolean
        } else {
          console.log('debugConsole not found in AsyncStorage');
        }
      })
      .catch(error => {
        console.error('Error retrieving discordProvenance:', error);
      });
  }, []); // Empty dependency array ensures it runs only once on mount
  useEffect(() => {
    AsyncStorage.getItem('WeatherdebugScreen')
      .then(debugScreen => {
        if (debugScreen !== null) {
          setDebugScreen(debugScreen === 'true'); // Convert the stored string to a boolean
        } else {
          console.log('discordProvenance not found in AsyncStorage');
        }
      })
      .catch(error => {
        console.error('Error retrieving discordProvenance:', error);
      });
  }, []);

  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>City :</Text>
      <TextInput
        placeholder="Enter city name here"
        value={city}
        onChangeText={handleInputChange}
        style={tailwind('p-2 mx-1 my-2 border-2 border-slate-50 rounded-lg')}
<<<<<<< HEAD
      />
      <NormalDropdown
        label="Select an Option for the type of forecast"
        data={forecastTypeOptions}
        onSelect={handleForecastTypeChange}
      />
      <NormalDropdown
        label="Select an Option for the value"
        data={forecastValueOptions}
        onSelect={handleForecastValueOptionsChange}
      />
      <TextInput
        placeholder="Enter value here"
        value={forecastValue}
        onChangeText={handleForecastValueChange}
        style={tailwind('p-2 mx-1 my-2 border-2 border-slate-50 rounded-lg')}
      />
      <ReactionList
        weatherData={weatherData}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
      />
=======
      />
      <ReactionList />
      <Button title="Submit" onPress={handleButtonPress} />
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
    </View>
  );
}

export interface WeatherData {
  city: string;
  forecast: {
    type: 'temperature' | 'wind' | 'humidity';
    value: number;
  };
  interval: '>' | '<' | '=';
  // message?: string;
}
