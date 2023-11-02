import {SetStateAction, useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {sendWeather} from '../apiHandling/weatherApi';
import {JokeData, WeatherData} from './Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {getJoke, sendJoke} from '../apiHandling/chuckAPI';
import {NormalDropdown} from './Dropdown';

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  weatherData?: WeatherData;
  jokeData?: JokeData;
};

export function ChuckReaD({
  debugScreen,
  debugConsole,
  weatherData,
}: // jokeData,
AreaBoxT): JSX.Element {
  const [backendIP, setbackendIp] = useState('localhost');
  const [signature, setSignature] = useState('');
  const [discordProvenance, setDiscordProvenance] = useState(false);
  let provenance = '';
  const [jokeType, setJokeType] = useState('Animal');

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
    reaction: {
      type: 'Discord',
      message: '',
    },
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
    const joke = await getJoke(jokeData, backendIP);

    const newMessage =
      'The Joke:\n------------\n  « ' +
      joke +
      ' »\n' +
      '------------\n~' +
      signature +
      '\n[' +
      provenance +
      ']';

    console.log(newMessage);

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
      <NormalDropdown
        label="Select an Option for the type of Joke"
        data={jokeTypeOptions}
        onSelect={handleJokeTypeChange}
      />
      <Button title="Send" onPress={handleButtonPress} />
    </View>
  );
}
