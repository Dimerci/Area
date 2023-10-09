import React, {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import ReactionList from './ReactionList';

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
  const [text, setText] = useState('');

  const handleInputChange = inputText => {
    setText(inputText);
  };

  const handleButtonPress = () => {
    // Do something with the input value (text)
    {
      debugConsole && console.log('Input value:', text);
    }
    {
      debugScreen && Alert.alert('Input value:', text);
    }
  };

  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>City :</Text>
      <TextInput
        placeholder="Enter text here"
        value={text}
        onChangeText={handleInputChange}
        style={tailwind('p-2 mx-1 my-2 border-2 border-slate-50 rounded-lg')}
      />
      <ReactionList />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
}
