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
    debugScreen: true,
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
    debugScreen: true,
  },
  {
    id: 4,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 5,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 6,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 7,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 8,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 9,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 10,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
  },
  {
    id: 11,
    title: 'Weather',
    component: <WeatherWidget debugScreen debugConsole />,
    debugConsole: true,
    debugScreen: true,
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
