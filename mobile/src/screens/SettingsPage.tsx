import React, {useState} from 'react';
import {ScrollView, Text, TextInput} from 'react-native';
import {useTailwind} from 'tailwind-rn';
const settings = require('../config/settings.json');

export function SettingsPage(): JSX.Element {
  const tailwind = useTailwind();
  const [ip, setIp] = useState(settings.ip);
  const handleInputChange = inputText => {
    setIp(inputText);
  };

  return (
    <ScrollView>
      <Text> This is the settings page</Text>
      <TextInput
        placeholder={settings.ip}
        value={ip}
        onChangeText={handleInputChange}
        style={tailwind('p-2 mx-1 my-1 border-2 border-slate-50 rounded-lg')}
      />
    </ScrollView>
  );
}
