import {SetStateAction, useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';
import {sendWeather} from '../../apiHandling/weatherApi';
import {ActionData, ClockData, WeatherData} from '../utils/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {postClock} from '../../apiHandling/clockAPI';

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  actionData: ActionData;
};

export function Discord({
  debugScreen,
  debugConsole,
  actionData,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [message, setMessage] = useState('');
  const [backendIP, setbackendIp] = useState('localhost');
  const [signature, setSignature] = useState('');
  const [discordProvenance, setDiscordProvenance] = useState(false);
  let provenance = '';

  const handleInputChange = (inputText: SetStateAction<string>) => {
    setMessage(inputText);
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
    const newMessage =
      message + '\n------------\n~' + signature + '\n[' + provenance + ']';

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
      <View style={tailwind('rounded-lg p-2 mx-1 my-1')}>
        <Text style={tailwind('text-slate-50')}>Message to send :</Text>
      </View>
      <View style={tailwind('bg-slate-600 rounded-b-lg p-2')}>
        <TextInput
          multiline
          numberOfLines={4} // Set the number of visible lines
          placeholder="Enter text here"
          value={message}
          onChangeText={handleInputChange}
          style={tailwind('p-2 mx-1 my-1 border-2 border-slate-50 rounded-lg')}
        />
      </View>
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
}
