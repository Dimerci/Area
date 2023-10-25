import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native';
import {useTailwind} from 'tailwind-rn';

export function BackendAPISettings() {
  const [backendIp, setbackendIp] = useState('localhost');
  const tailwind = useTailwind();

  const onPress = async () => {
    await AsyncStorage.setItem('backendIP', backendIp);
  };

  useEffect(() => {
    AsyncStorage.getItem('backendIP')
      .then(backendIp => {
        if (backendIp !== null) {
          setbackendIp(backendIp); // Convert the stored string to a boolean
        } else {
          console.log('backendIp not found in AsyncStorage');
        }
      })
      .catch(error => {
        console.error('Error retrieving backendIp:', error);
      });
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <View>
      <Text>Current Backend IP = {backendIp}</Text>
      <View style={tailwind('flex-row')}>
        <TextInput
          placeholder="Enter your backend IP"
          onChangeText={text => setbackendIp(text)}
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
