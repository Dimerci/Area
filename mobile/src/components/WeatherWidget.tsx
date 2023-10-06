// import React, {useState} from 'react';
// import {Alert, Switch, Text, View} from 'react-native';
// import {useTailwind} from 'tailwind-rn';

// type WeatherWidgetT = {
//   city: string;
//   children?: React.ReactNode; // Define children prop
//   debug?: boolean;
// };

// export function WeatherWidget({
//   city,
//   children,
//   debug,
// }: WeatherWidgetT): JSX.Element {
//   const tailwind = useTailwind();
//   //   const [isActive, setIsActive] = useState(false);

//   //   const toggleSwitch = () => {
//   //     setIsActive(!isActive);
//   //     {
//   //       debug && Alert.alert('Switched ' + title + ' to ' + !isActive);
//   //     }
//   //   };

//   return (
//     <View>
//       <Text style={tailwind('text-slate-50')}>City :</Text>
// <Input
//       <Switch value={isActive} onValueChange={toggleSwitch} />
//     </View>
//   );
// }
