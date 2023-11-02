import {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button} from 'react-native-elements';
import {sendWeather} from '../../apiHandling/weatherApi';
import {ActionData, ClockData, WeatherData} from '../utils/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {getMeal} from '../../apiHandling/mealDBAPI';
import {postClock} from '../../apiHandling/clockAPI';

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
  const [signature, setSignature] = useState('');
  const [discordProvenance, setDiscordProvenance] = useState(false);
  let provenance = '';

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

  useEffect(() => {
    AsyncStorage.getItem('discordProvenance')
      .then(discordProvenance => {
        if (discordProvenance !== null) {
          // Convert the stored value to a boolean
          const isDebug = discordProvenance === 'true';
          setDiscordProvenance(isDebug);
        } else {
          setDiscordProvenance(false);
        }
      })
      .catch(error => {
        console.error('Error retrieving DebugScreen:', error);
      });
  }, []);

  AsyncStorage.getItem('discordSignature')
    .then(signature => {
      if (signature) {
        setSignature(signature);
      } else {
        console.log('signature not found');
        setSignature('');
      }
    })
    .catch(error => {
      console.error('Error retrieving backendIP:', error);
    });
  async function buildMessage() {
    let provenance;

    if (discordProvenance) {
      provenance = await DeviceInfo.getDeviceName();
    } else {
      provenance = 'Confidential';
    }

    // Now, construct the message with the correct provenance
    const meal = await getMeal(backendIP);

    const newMessage =
      '# The Meal:\n------------\n ## __Ingredients__ :\n' +
      meal.ingredients +
      '\n ## __Instructions__ :\n' +
      meal.instructions +
      '\n------------\n~' +
      signature +
      '\n[' +
      provenance +
      ']';

    console.log(newMessage);

    if (actionData.weatherData) {
      const newWeatherData: WeatherData = {
        city: actionData.weatherData?.city,
        forecast: {
          type: actionData.weatherData?.forecast.type,
          value: actionData.weatherData?.forecast.value,
        },
        interval: actionData.weatherData?.interval,
        reaction: {
          type: 'Discord',
          message: newMessage,
        },
      };
      debugScreen &&
        Alert.alert('Send this:\n' + newWeatherData?.reaction?.message);
      debugConsole &&
        console.log('Send this:\n' + newWeatherData?.reaction?.message);

      sendWeather(newWeatherData, backendIP);
    } else if (actionData.clockData) {
      const newClockData: ClockData = {
        city: actionData.clockData.city,
        message: newMessage,
      };
      debugScreen && Alert.alert('Send this:\n' + newClockData?.message);
      debugConsole && console.log('Send this:\n' + newClockData?.message);

      postClock(newClockData, backendIP);
    } else {
      console.error('Something went wrong');
    }
  }

  const handleButtonPress = () => {
    buildMessage();
  };

  return (
    <View>
      <Button title="Get a recipe" onPress={handleButtonPress} />
    </View>
  );
}
