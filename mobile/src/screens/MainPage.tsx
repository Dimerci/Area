import React from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
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
  const Item = ({item}: any) => (
    <Box title={item.title} key={item.id}>
      {item.component}
    </Box>
  );

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id.toString()} // Provide a unique key for each item
    />
  );
}
