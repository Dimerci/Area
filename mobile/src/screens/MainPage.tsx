import React from 'react';
import {ScrollView, Text} from 'react-native';
import {WeatherWidget} from '../components/widgets/WeatherWidget';
import {Box} from '../components/utils/Box';
import {ClockWidget} from '../components/widgets/ClockWidget';
import {ProfileWidget} from '../components/widgets/Profile';

const data = [
  {
    id: 1,
    title: 'Weather',
    component: <WeatherWidget />,
  },
  {
    id: 2,
    title: 'Clock',
    component: <ClockWidget />,
  },
  {
    id: 3,
    title: 'Profile',
    component: <ProfileWidget />,
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
