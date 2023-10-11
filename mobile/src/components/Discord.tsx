import {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';
import {sendWeather} from '../apiHandling/weatherApi';
import {WeatherData} from './WeatherWidget';

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  weatherData?: WeatherData;
};

export function Discord({
  debugScreen,
  debugConsole,
  weatherData,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [message, setMessage] = useState('');
  const newWeatherData = {
    city: weatherData?.city,
    forecast: {
      type: weatherData?.forecast.type,
      value: weatherData?.forecast.value,
    },
    interval: weatherData?.interval,
    message: message,
  };

  const handleInputChange = inputText => {
    setMessage(inputText);
  };

  const handleButtonPress = () => {
    debugScreen && Alert.alert('Send this :' + message);
    debugConsole && console.log('Send this :' + message);

    sendWeather(newWeatherData);
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
