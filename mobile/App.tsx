/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {AreaBox} from './src/components/Box';
import {Button, ScrollView, Text} from 'react-native';
import {WeatherWidget} from './src/components/WeatherWidget';

function App(): JSX.Element {
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
      component: <WeatherWidget debugScreen />,
      debugConsole: false,
      debugScreen: false,
    },
  ];
  return (
    <TailwindProvider utilities={utilities}>
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
    </TailwindProvider>
  );
}

export default App;
