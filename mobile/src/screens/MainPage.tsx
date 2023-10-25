import React from 'react';
import {ScrollView, Text} from 'react-native';
import {WeatherWidget} from '../components/WeatherWidget';
import {Button} from 'react-native-elements';
import {Box} from '../components/Box';

const data = [
  {
    id: 1,
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
        <Box title={box.title} key={box.id}>
          {box.component}
        </Box>
      ))}
    </ScrollView>
  );
}
