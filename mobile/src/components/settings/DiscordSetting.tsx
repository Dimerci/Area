import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

export function DiscordSetting() {
  const tailwind = useTailwind();
  const [signature, setSignature] = useState(' ');
  const [discordProvenance, setDiscordProvenance] = useState(false);

  const onPress = async () => {
    await AsyncStorage.setItem('discordSignature', signature);
  };

  // Use useEffect to retrieve the value from AsyncStorage when the component mounts
  useEffect(() => {
    AsyncStorage.getItem('discordProvenance')
      .then(discordProvenance => {
        if (discordProvenance !== null) {
          setDiscordProvenance(discordProvenance === 'true'); // Convert the stored string to a boolean
        } else {
          console.log('discordProvenance not found in AsyncStorage');
        }
      })
      .catch(error => {
        console.error('Error retrieving discordProvenance:', error);
      });
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleIsActive = async () => {
    try {
      const newValue = !discordProvenance; // Toggle the boolean value
      await AsyncStorage.setItem('discordProvenance', newValue.toString()); // Convert to string
      setDiscordProvenance(newValue); // Update the state and UI

      console.log('Setting saved successfully : ' + newValue);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  return (
    <View>
      <Text>Enter your signature</Text>
      <TextInput
        placeholder="Enter your"
        onChangeText={text => setSignature(text)}
        value={signature}
        style={tailwind('p-2 mx-1 my-1 basis-10/12 border-2 rounded-lg')}
      />
      <View style={tailwind('flex-row')}>
        <Text style={tailwind('basis-10/12')}>
          Want to show where you sent the message from ?
        </Text>
        <Switch value={discordProvenance} onValueChange={handleIsActive} />
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={tailwind(
          'bg-teal-800 text-center p-2 w-14 mx-1 my-1 rounded-lg',
        )}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
