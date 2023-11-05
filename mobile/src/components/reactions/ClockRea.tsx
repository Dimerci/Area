import AsyncStorage from '@react-native-async-storage/async-storage';
import {SetStateAction, useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {sendWeather} from '../../apiHandling/weatherApi';
import {AreaBoxT, WeatherData} from '../utils/Interfaces';

export function Clock({
  debugScreen,
  debugConsole,
  actionData,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [city, setCity] = useState('');
  const [backendIP, setbackendIp] = useState('localhost');

  const handleInputChange = (inputText: SetStateAction<string>) => {
    setCity(inputText);
  };

  AsyncStorage.getItem('backendIP')
    .then(backendIp => {
      if (backendIp) {
        setbackendIp(backendIp);
      } else {
        console.log('IP not found');
        setbackendIp('localhost');
      }
    })
    .catch(error => {
      console.error('Error retrieving backendIP:', error);
    });

  async function buildMessage() {
    if (actionData.weatherData) {
      const newWeatherData: WeatherData = {
        clientId: actionData.weatherData.clientId,
        city: actionData.weatherData?.city,
        forecast: {
          type: actionData.weatherData?.forecast.type,
          value: actionData.weatherData?.forecast.value,
        },
        interval: actionData.weatherData?.interval,
        reaction: {
          type: 'Clock',
          message: city,
        },
      };
      debugScreen &&
        Alert.alert('Send this:\n' + newWeatherData?.reaction?.message);
      debugConsole &&
        console.log('Send this:\n' + newWeatherData?.reaction?.message);

      sendWeather(newWeatherData, backendIP);
    } else {
      console.error('Something went wrong');
    }
  }

  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>City :</Text>
      <TextInput
        placeholder="Enter city name here"
        value={city}
        onChangeText={handleInputChange}
        style={tailwind('p-2 mx-1 my-2 border-2 border-slate-50 rounded-lg')}
      />
      <Button title="Submit" onPress={buildMessage} />
    </View>
  );
}
