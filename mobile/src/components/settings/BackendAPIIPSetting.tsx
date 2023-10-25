import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native';
import {useTailwind} from 'tailwind-rn';

export function BackendAPISettings() {
  const [backendIp, setbackendIp] = useState('localhost');
  const tailwind = useTailwind();

  const onPress = async () => {
    await AsyncStorage.setItem('backendIP', backendIp);
  };
  return (
    <View>
      <View style={tailwind('flex-row')}>
        <TextInput
          placeholder="Enter your backend IP"
          onChangeText={text => setbackendIp(text)}
          value={backendIp}
          style={tailwind('p-2 mx-1 my-1 basis-10/12 border-2 rounded-lg')}
        />
        <TouchableOpacity
          onPress={onPress}
          style={tailwind(
            'bg-teal-800 text-center p-2 w-14 mx-1 my-1 rounded-lg',
          )}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
