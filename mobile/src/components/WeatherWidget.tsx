import {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from './ReactionList';
import {NormalDropdown} from './Dropdown';

type WeatherWidgetT = {
  children?: React.ReactNode; // Define children prop
  debugScreen?: boolean;
  debugConsole?: boolean;
};

export function WeatherWidget({
  debugScreen,
  debugConsole,
}: WeatherWidgetT): JSX.Element {
  const tailwind = useTailwind();
  const [city, setCity] = useState('');
  const [forecastType, setForecastType] = useState('Temperature');
  const [forecastValue, setForecastValue] = useState('');
  const [forecastOptionValue, setForecastOptionValue] = useState('=');

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
  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>City :</Text>
      <TextInput
        placeholder="Enter city name here"
        value={city}
        onChangeText={handleInputChange}
        style={tailwind('p-2 mx-1 my-2 border-2 border-slate-50 rounded-lg')}
      />
      <NormalDropdown
        label="Select an Option"
        data={forecastTypeOptions}
        onSelect={handleForecastTypeChange}
      />
      <NormalDropdown
        label="Select an Option"
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
