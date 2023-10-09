import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';

type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  reaData: string;
};

export function Discord({debugScreen, debugConsole}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [message, setMessage] = useState('');

  const handleInputChange = inputText => {
    setMessage(inputText);
  };

  const handleButtonPress = () => {
    debugScreen && Alert.alert('Send this :' + message);
    debugConsole && console.log('Send this :' + message);
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
