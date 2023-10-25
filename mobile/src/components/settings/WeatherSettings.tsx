import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

export function WeatherSettings() {
  const tailwind = useTailwind();
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);
  const [weatherWidget, setWeatherWidget] = useState(false);

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
  useEffect(() => {
    AsyncStorage.getItem('Weather_isActive')
      .then(weatherWidget => {
        if (weatherWidget !== null) {
          setWeatherWidget(weatherWidget === 'true'); // Convert the stored string to a boolean
        } else {
          console.log('weather_isActive not found in AsyncStorage');
        }
      })
      .catch(error => {
        console.error('Error retrieving weather_isActive:', error);
      });
  }, []);

  const handleIsActiveDebugConsole = async () => {
    try {
      const newValue = !debugConsole; // Toggle the boolean value
      await AsyncStorage.setItem('WeatherdebugConsole', newValue.toString()); // Convert to string
      setDebugConsole(newValue); // Update the state and UI

      console.log('Setting saved successfully : ' + newValue);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };
  const handleIsActiveDebugScreen = async () => {
    try {
      const newValue = !debugScreen; // Toggle the boolean value
      await AsyncStorage.setItem('WeatherdebugScreen', newValue.toString()); // Convert to string
      setDebugScreen(newValue); // Update the state and UI

      console.log('Setting saved successfully : ' + newValue);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };
  const handleIsActiveWeatherWidget = async () => {
    try {
      const newValue = !weatherWidget; // Toggle the boolean value
      await AsyncStorage.setItem('Weather_isActive', newValue.toString()); // Convert to string
      setWeatherWidget(newValue); // Update the state and UI

      console.log('Setting saved successfully : ' + newValue);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  return (
    <View>
      <View style={tailwind('flex-row')}>
        <Text style={tailwind('basis-10/12')}>
          Want to see the Weather Widget ?
        </Text>
        <Switch
          value={weatherWidget}
          onValueChange={handleIsActiveWeatherWidget}
        />
      </View>
      <View style={tailwind('flex-row')}>
        <Text style={tailwind('basis-10/12')}>
          Want to see the debug console ?
        </Text>
        <Switch
          value={debugConsole}
          onValueChange={handleIsActiveDebugConsole}
        />
      </View>
      <View style={tailwind('flex-row')}>
        <Text style={tailwind('basis-10/12')}>
          Want to see the debug screen ?
        </Text>
        <Switch value={debugScreen} onValueChange={handleIsActiveDebugScreen} />
      </View>
    </View>
  );
}
