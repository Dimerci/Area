import React, {useState} from 'react';
import {Alert, Button, Switch, Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

type WeatherWidgetT = {
  children?: React.ReactNode; // Define children prop
  debugScreen?: boolean;
  debugConsole?: boolean;
};

export function WeatherWidget({
  children,
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
      <Text style={tailwind('text-slate-50')}>City :</Text>
      <TextInput
        placeholder="Enter text here"
        value={text}
        onChangeText={handleInputChange}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
}
