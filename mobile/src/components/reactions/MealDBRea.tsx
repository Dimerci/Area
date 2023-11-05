import {SetStateAction, useEffect, useState} from 'react';
import {
  Alert,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {sendWeather} from '../../apiHandling/weatherApi';
import {ActionData, WeatherData} from '../utils/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTailwind} from 'tailwind-rn';

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  actionData: ActionData;
};

export function MealDBRea({
  debugScreen,
  debugConsole,
  actionData,
}: AreaBoxT): JSX.Element {
  const [backendIP, setbackendIp] = useState('localhost');
  const [message, setMessage] = useState('');
  const tailwind = useTailwind();
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (inputText: SetStateAction<string>) => {
    if (isChecked) {
      setMessage('filter:' + inputText);
    } else {
      setMessage(inputText);
    }
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
          type: 'Meal',
          message: message,
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
      <Text>
        Enter the name of your {isChecked && <Text>ingredient</Text>}{' '}
        {!isChecked && <Text>dish</Text>}
      </Text>
      <TextInput
        placeholder="Enter text here"
        value={message}
        onChangeText={handleInputChange}
        style={tailwind(
          'p-2 mx-1 my-1 border-2 border-slate-50 rounded-lg basis-10/12',
        )}
      />
      <View style={tailwind('flex-row')}>
        <Text style={tailwind('p-2 mx-1 my-1 basis-10/12')}>
          Ingredient filter ?
        </Text>
        <Switch value={isChecked} onValueChange={toggleCheckbox} />
      </View>
      <Button title="Get a recipe" onPress={handleButtonPress} />
    </View>
  );
}
