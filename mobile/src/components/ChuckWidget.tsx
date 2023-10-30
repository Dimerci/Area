import {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from './ReactionList';
import {NormalDropdown} from './Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JokeData} from './Interfaces';

type ChuckWidgetT = {
  children?: React.ReactNode; // Define children prop
};

export function ChuckWidget({}: ChuckWidgetT): JSX.Element {
  const tailwind = useTailwind();
  const [jokeType, setJokeType] = useState('Animal');
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);

  let jokeData: JokeData = {
    jokeType = 'animal',
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
  const handleJokeTypeChange = value => {
    setJokeType(value.value);
    jokeData.jokeType = value.value;
  };

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

  return (
    <View>
      <NormalDropdown
        label="Select an Option for the type of Joke"
        data={jokeTypeOptions}
        onSelect={handleJokeTypeChange}
      />
      <ReactionList
        jokeData={jokeData}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
      />
    </View>
  );
}
