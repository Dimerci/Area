import {SetStateAction, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button} from 'react-native-elements';
import {sendWeather} from '../../apiHandling/weatherApi';
import {
  ActionData,
  AreaBoxT,
  ClockData,
  JokeData,
  WeatherData,
} from '../utils/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NormalDropdown} from '../utils/Dropdown';

export function ChuckReaD({
  debugScreen,
  debugConsole,
  actionData,
}: AreaBoxT): JSX.Element {
  const [backendIP, setbackendIp] = useState('localhost');
  const [jokeType, setJokeType] = useState('animal');

  let jokeData: JokeData = {
    jokeType: jokeType as
      | 'animal'
      | 'career'
      | 'celebrity'
      | 'dev'
      | 'explicit'
      | 'fashion'
      | 'food'
      | 'history'
      | 'money'
      | 'movie'
      | 'music'
      | 'political'
      | 'religion'
      | 'science'
      | 'sport'
      | 'travel',
  };

  const jokeTypeOptions = [
    {label: 'Animal', value: 'animal'},
    {label: 'Career', value: 'career'},
    {label: 'Celebrity', value: 'celebrity'},
    {label: 'Dev', value: 'dev'},
    {label: 'Explicit', value: 'explicit'},
    {label: 'Fashion', value: 'fashion'},
    {label: 'Food', value: 'food'},
    {label: 'History', value: 'history'},
    {label: 'Money', value: 'money'},
    {label: 'Movie', value: 'movie'},
    {label: 'Music', value: 'music'},
    {label: 'Political', value: 'political'},
    {label: 'Religion', value: 'religion'},
    {label: 'Science', value: 'science'},
    {label: 'Sport', value: 'sport'},
    {label: 'Travel', value: 'travel'},
  ];
  const handleJokeTypeChange = (value: {value: SetStateAction<string>}) => {
    setJokeType(value.value);
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
          type: 'Chuck Norris',
          message: jokeData.jokeType,
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

  const handleButtonPress = () => {
    buildMessage();
  };

  return (
    <View>
      <NormalDropdown
        label="Select an Option for the type of Joke"
        data={jokeTypeOptions}
        onSelect={handleJokeTypeChange}
      />
      <Button title="Send" onPress={handleButtonPress} />
    </View>
  );
}
