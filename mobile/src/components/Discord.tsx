import {useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';
import {sendWeather} from '../apiHandling/weatherApi';
import {JokeData, WeatherData} from './Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {sendJoke} from '../apiHandling/chuckAPI';

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  weatherData?: WeatherData;
  jokeData?: JokeData;
};

export function Discord({
  debugScreen,
  debugConsole,
  weatherData,
  jokeData,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [message, setMessage] = useState('');
  const [backendIP, setbackendIp] = useState('localhost');
  const [signature, setSignature] = useState('');
  const [discordProvenance, setDiscordProvenance] = useState(false);
  let provenance = '';

  const handleInputChange = inputText => {
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

    if (weatherData) {
      const newWeatherData: WeatherData = {
        city: weatherData?.city,
        forecast: {
          type: weatherData?.forecast.type,
          value: weatherData?.forecast.value,
        },
        interval: weatherData?.interval,
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
    } else if (jokeData) {
      const newJokeData: JokeData = {
        jokeType: jokeData.jokeType,
        reaction: {
          type: 'Discord',
          message: newMessage,
        },
      };
      console.log(newJokeData?.reaction?.message);
      console.log(provenance);
      debugScreen &&
        Alert.alert('Send this:\n' + newJokeData?.reaction?.message);
      debugConsole &&
        console.log('Send this:\n' + newJokeData?.reaction?.message);
      sendJoke(newJokeData, backendIP);
    } else {
      Alert.alert('You did not input a message');
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
