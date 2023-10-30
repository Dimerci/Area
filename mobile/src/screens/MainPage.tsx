import React from 'react';
import {ScrollView, Text} from 'react-native';
import {WeatherWidget} from '../components/WeatherWidget';
import {Box} from '../components/Box';
import {ChuckWidget} from '../components/ChuckWidget';

const data = [
  {
    id: 1,
    title: 'Weather',
    component: <WeatherWidget />,
  },
  {
    id: 2,
    title: 'Chuck Norris',
    component: <ChuckWidget />,
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
