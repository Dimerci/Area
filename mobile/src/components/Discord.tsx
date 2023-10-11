<<<<<<< HEAD
import {useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';
import {sendWeather} from '../apiHandling/weatherApi';
import {WeatherData} from './Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
=======
import React, {useState} from 'react';
import {Alert, Switch, Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
<<<<<<< HEAD
  weatherData?: WeatherData;
};

export function Discord({
  debugScreen,
  debugConsole,
  weatherData,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [message, setMessage] = useState('');
  const [backendIP, setbackendIp] = useState('localhost');
  const [signature, setSignature] = useState('');
  const [discordProvenance, setDiscordProvenance] = useState(false);
  let provenance = '';
=======
};

export function Discord({
  debugScreen,
  debugConsole,
  weatherData,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [message, setMessage] = useState('');
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)

  const handleInputChange = inputText => {
    setMessage(inputText);
  };

<<<<<<< HEAD
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

    const newWeatherData = {
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
    console.log(newWeatherData.reaction.message);
    console.log(provenance);
    debugScreen &&
      Alert.alert('Send this:\n' + newWeatherData.reaction.message);
    debugConsole &&
      console.log('Send this:\n' + newWeatherData.reaction.message);

    sendWeather(newWeatherData, backendIP);
  }

  const handleButtonPress = () => {
    buildMessage();
=======
  const MessageSend = () => {
    debugScreen && Alert.alert('Sent this :' + message);
    debugConsole && console.log('Sent this :' + message);
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
  };

  return (
    <View>
      <View style={tailwind('rounded-lg p-2 mx-1 my-1')}>
        <Text style={tailwind('text-slate-50')}>Message to send :</Text>
<<<<<<< HEAD
=======
        {debugConsole && <Text>debugConsole on</Text>}
        {debugScreen && <Text>debugScreen on</Text>}
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
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
<<<<<<< HEAD
      <Button title="Submit" onPress={handleButtonPress} />
=======
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
    </View>
  );
}
