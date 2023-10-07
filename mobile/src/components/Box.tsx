import React, {useState} from 'react';
import {Alert, Switch, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

type AreaBoxT = {
  title: string;
  children?: React.ReactNode; // Define children prop
  debugScreen?: boolean;
  debugConsole?: boolean;
};

export function AreaBox({
  title,
  children,
  debugScreen,
  debugConsole,
}: AreaBoxT): JSX.Element {
  const tailwind = useTailwind();
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
    {
      debugScreen && Alert.alert('Switched ' + title + ' to ' + !isActive);
      debugConsole && console.log('Switched ' + title + ' to ' + !isActive);
    }
  };

  return (
    <View>
      <View style={tailwind('bg-slate-500 rounded-t-lg p-2 mx-5 mt-5')}>
        <Text style={tailwind('text-slate-50')}>{title} Configuration</Text>
        {debugConsole && <Text>debugConsole on</Text>}
        {debugScreen && <Text>debugScreen on</Text>}
        <Switch value={isActive} onValueChange={toggleSwitch} />
      </View>
      {isActive && (
        <View style={tailwind('bg-slate-600 rounded-b-lg p-2 mx-5')}>
          {/* Render the children passed to AreaBox */}
          {children}
        </View>
      )}
    </View>
  );
}
