import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTailwind} from 'tailwind-rn';

export function VisualSettings() {
  const tailwind = useTailwind();
  const [SelectedPrimaryColor, setSelectedPrimaryColor] = useState('#1e90ff'); // Initial color
  const [primaryColor, setPrimaryColor] = useState('');
  const [selectedSecondaryColor, setSelectedSecondaryColor] =
    useState('#87cefa'); // Initial color
  const [secondaryColor, setSecondaryColor] = useState('');
  const [error, setError] = useState('');

  const saveColor = async () => {
    if (isValidHexColor(primaryColor) && isValidHexColor(secondaryColor)) {
      setSelectedPrimaryColor(primaryColor);
      setSelectedSecondaryColor(secondaryColor);
      setError('');
      await AsyncStorage.setItem('primaryColor', primaryColor);
      await AsyncStorage.setItem('secondaryColor', secondaryColor);
    } else {
      setError('Invalid color code');
    }
  };

  const isValidHexColor = (color: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

  return (
    <View>
      <Text>Selected Color:</Text>
      <TextInput
        placeholder="Enter a custom primary color code"
        onChangeText={text => setPrimaryColor(text)}
        value={primaryColor}
        style={tailwind('p-2 mx-1 my-1 basis-10/12 border-2 rounded-lg')}
      />
      <TextInput
        placeholder="Enter a custom secondary color code"
        onChangeText={text => setSecondaryColor(text)}
        value={secondaryColor}
        style={tailwind('p-2 mx-1 my-1 basis-10/12 border-2 rounded-lg')}
      />
      <Text style={{color: 'red'}}>{error}</Text>
      <TouchableOpacity
        onPress={saveColor}
        style={tailwind(
          'bg-teal-800 text-center p-2 w-14 mx-1 my-1 rounded-lg',
        )}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
