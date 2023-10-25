import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

type BoxT = {
  title: String;
  children?: React.ReactNode;
};

export function Box({title, children}: BoxT): JSX.Element {
  const tailwind = useTailwind();
  const [isActive, setIsActive] = useState(false);
  const [debugConsole, setDebugConsole] = useState(false);
  const [debugScreen, setDebugScreen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#1e90ff');
  const [secondaryColor, setSecondaryColor] = useState('#87cefa');

  useEffect(() => {
    AsyncStorage.getItem(title + 'debugConsole')
      .then(debugConsole => {
        if (debugConsole !== null) {
          // Convert the stored value to a boolean
          const isDebug = debugConsole === 'true';
          setDebugConsole(isDebug);
        } else {
          setDebugConsole(false);
        }
      })
      .catch(error => {
        console.error('Error retrieving DebugScreen:', error);
      });
  }, []); // Add an empty dependency array to run this effect only once on component mount

  useEffect(() => {
    AsyncStorage.getItem(title + 'debugScreen')
      .then(debugScreen => {
        if (debugScreen !== null) {
          // Convert the stored value to a boolean
          const isDebug = debugScreen === 'true';
          setDebugScreen(isDebug);
        } else {
          setDebugScreen(false);
        }
      })
      .catch(error => {
        console.error('Error retrieving DebugScreen:', error);
      });
  }, []); // Add an empty dependency array to run this effect only once on component mount

  AsyncStorage.getItem('primaryColor')
    .then(primaryColor => {
      if (primaryColor) {
        setPrimaryColor(primaryColor);
      } else {
        console.log(
          'primaryColor not found in AsyncStorage or debugScreen off for' +
            title,
        );
        setPrimaryColor('#1e90ff');
      }
    })
    .catch(error => {
      console.error('Error retrieving DebugScreen:', error);
    });

  AsyncStorage.getItem('secondaryColor')
    .then(secondaryColor => {
      if (secondaryColor) {
        setSecondaryColor(secondaryColor);
      } else {
        console.log(
          'secondaryColor not found in AsyncStorage or debugScreen off for' +
            title,
        );
        setSecondaryColor('#87cefa');
      }
    })
    .catch(error => {
      console.error('Error retrieving DebugScreen:', error);
    });

  const toggleSwitch = () => {
    setIsActive(!isActive);
    {
      debugScreen && Alert.alert('Switched ' + title + ' to ' + !isActive);
      debugConsole && console.log('Switched ' + title + ' to ' + !isActive);
    }
  };

  return (
    <View style={tailwind('rounded-lg border-2 my-2 mx-4')}>
      {isActive && (
        <TouchableOpacity onPress={toggleSwitch}>
          <View
            style={[
              tailwind('rounded-t-lg p-2 flex-row'),
              {backgroundColor: primaryColor},
            ]}>
            <View style={tailwind('flex-row')}>
              <Text style={tailwind('text-slate-50 basis-11/12')}>{title}</Text>
              {debugConsole && <Text>C </Text>}
              {debugScreen && <Text>S </Text>}
              <Text style={tailwind('text-slate-50')}>/\</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      {!isActive && (
        <TouchableOpacity onPress={toggleSwitch}>
          <View
            style={[
              tailwind('rounded-t-lg p-2 flex-row'),
              {backgroundColor: primaryColor},
            ]}>
            <View style={tailwind('flex-row')}>
              <Text style={tailwind('text-slate-50 basis-11/12')}>{title}</Text>
              {debugConsole && <Text>C </Text>}
              {debugScreen && <Text>S </Text>}
              <Text style={tailwind('text-slate-50')}>\/</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      {isActive && (
        <View
          style={[
            tailwind('bg-slate-600 rounded-b-lg p-2'),
            {backgroundColor: secondaryColor},
          ]}>
          {/* Render the children passed to AreaBox */}
          {children}
        </View>
      )}
    </View>
  );
}
