import {SetStateAction, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from '../reactions/ReactionList';
import {ActionData, ClockData} from '../utils/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ClockWidgetT = {
  children?: React.ReactNode; // Define children prop
};

export function ClockWidget({}: ClockWidgetT): JSX.Element {
  const tailwind = useTailwind();
  const [city, setCity] = useState('');
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);

  const handleInputChange = (inputText: SetStateAction<string>) => {
    setCity(inputText);
  };

  const clockData: ClockData = {
    city: city,
  };

  const actionData: ActionData = {
    clockData: clockData,
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
      <ReactionList
        actionData={actionData}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
      />
    </View>
  );
}
