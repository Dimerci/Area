import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
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

  // let reaData =
  //   '{"city": "' +
  //   city +
  //   '","forecast" : {"type": "' +
  //   type +
  //   '","value":' +
  //   value +
  //   '}, "interval": "' +
  //   interval +
  //   '","message": "' +
  //   message +
  //   '"}';

  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>City :</Text>
      <TextInput
        placeholder="Enter text here"
        value={text}
        onChangeText={handleInputChange}
        style={tailwind('p-2 mx-1 my-2 border-2 border-slate-50 rounded-lg')}
      />
      <ReactionList
        reaData="test"
        debugConsole={debugConsole}
        debugScreen={debugScreen}
      />
    </View>
  );
}
