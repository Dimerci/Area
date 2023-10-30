import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

export function ChuckSettings() {
  const tailwind = useTailwind();
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);
  const [weatherWidget, setWeatherWidget] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('ChuckdebugConsole')
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
    AsyncStorage.getItem('ChuckdebugScreen')
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
    AsyncStorage.getItem('Chuck_isActive')
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
      await AsyncStorage.setItem('ChuckdebugConsole', newValue.toString()); // Convert to string
      setDebugConsole(newValue); // Update the state and UI

      console.log('Setting saved successfully : ' + newValue);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };
  const handleIsActiveDebugScreen = async () => {
    try {
      const newValue = !debugScreen; // Toggle the boolean value
      await AsyncStorage.setItem('ChuckdebugScreen', newValue.toString()); // Convert to string
      setDebugScreen(newValue); // Update the state and UI

      console.log('Setting saved successfully : ' + newValue);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };
  const handleIsActiveChuckWidget = async () => {
    try {
      const newValue = !weatherWidget; // Toggle the boolean value
      await AsyncStorage.setItem('Chuck_isActive', newValue.toString()); // Convert to string
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
          Want to see the Chuck Widget ?
        </Text>
        <Switch
          value={weatherWidget}
          onValueChange={handleIsActiveChuckWidget}
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
