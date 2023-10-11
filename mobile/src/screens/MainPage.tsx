import React from 'react';
import {ScrollView, Text} from 'react-native';
import {WeatherWidget} from '../components/WeatherWidget';
import {Button} from 'react-native-elements';
import {AreaBox} from '../components/Box';

const data = [
  {
    id: 1,
    title: 'Test 1',
    component: <Text>Test</Text>,
    debugConsole: true,
    debugScreen: false,
  },
  {
    id: 2,
    title: 'Button Test',
    component: <Button title="Test" />,
    debugConsole: true,
    debugScreen: false,
  },
  {
    id: 3,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: false,
  },
];

export function MainPage(): JSX.Element {
  return (
    <ScrollView>
      {data.map(box => (
        <AreaBox
          title={box.title}
          debugConsole={box.debugConsole}
          debugScreen={box.debugScreen}
          key={box.id}>
          {box.component}
        </AreaBox>
      ))}
    </ScrollView>
  );
}
