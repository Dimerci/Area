import {SetStateAction, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from '../reactions/ReactionList';
import {NormalDropdown} from '../utils/Dropdown';
import {ActionData, WeatherData} from '../utils/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth0} from 'react-native-auth0';

type WeatherWidgetT = {
  children?: React.ReactNode; // Define children prop
};

export function WeatherWidget({}: WeatherWidgetT): JSX.Element {
  const tailwind = useTailwind();
  const [city, setCity] = useState('');
  const [forecastType, setForecastType] = useState('Temperature');
  const [forecastValue, setForecastValue] = useState('');
  const [forecastOptionValue, setForecastOptionValue] = useState('=');
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);
  const {user} = useAuth0();
  let clientId = user?.email;

  const handleInputChange = (inputText: SetStateAction<string>) => {
    setCity(inputText);
  };
  const forecastTypeOptions = [
    {label: 'Temperature', value: 'temperature'},
    {label: 'Wind', value: 'wind'},
    {label: 'Humidity', value: 'humidity'},
  ];
  const handleForecastTypeChange = (value: {value: SetStateAction<string>}) => {
    setForecastType(value.value);
  };
  const handleForecastValueChange = (value: SetStateAction<string>) => {
    setForecastValue(value);
  };
  const handleForecastValueOptionsChange = (value: {
    value: SetStateAction<string>;
  }) => {
    setForecastOptionValue(value.value);
  };
  const forecastValueOptions = [
    {label: 'Equal', value: '='},
    {label: 'Greater Than', value: '>'},
    {label: 'Lesser Than', value: '<'},
  ];

  if (clientId) {
    const weatherData: WeatherData = {
      clientId,
      city,
      forecast: {
        type: forecastType as 'temperature' | 'wind' | 'humidity',
        value: Number(forecastValue),
      },
      interval: forecastOptionValue as '=' | '<' | '>',
    };

    const actionData: ActionData = {
      weatherData: weatherData,
    };

    useEffect(() => {
      AsyncStorage.getItem('WeatherdebugConsole')
        .then(debugConsole => {
          if (debugConsole !== null) {
            setDebugConsole(debugConsole === 'true'); // Convert the stored string to a boolean
          } else {
            console.log('debugConsole not found in AsyncStorage');
          }
        })
        .catch(error => {
          console.error('Error retrieving discordProvenance:', error);
        });
    }, []); // Empty dependency array ensures it runs only once on mount
    useEffect(() => {
      AsyncStorage.getItem('WeatherdebugScreen')
        .then(debugScreen => {
          if (debugScreen !== null) {
            setDebugScreen(debugScreen === 'true'); // Convert the stored string to a boolean
          } else {
            console.log('discordProvenance not found in AsyncStorage');
          }
        })
        .catch(error => {
          console.error('Error retrieving discordProvenance:', error);
        });
    }, []);

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
          label="Select an Option for the type of forecast"
          data={forecastTypeOptions}
          onSelect={handleForecastTypeChange}
        />
        <NormalDropdown
          label="Select an Option for the value"
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
          actionData={actionData}
          debugConsole={debugConsole}
          debugScreen={debugScreen}
        />
      </View>
    );
  }
  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>Loadding...</Text>
    </View>
  );
}
