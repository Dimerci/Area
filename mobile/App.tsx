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
import {Button, Text} from 'react-native';

function App(): JSX.Element {
  const data = [
    {
      id: 1,
      title: 'Test 1',
      component: <Text>Test</Text>,
      debug: true,
    },
    {
      id: 2,
      title: 'Test 2',
      component: <Text>Test 2</Text>,
      debug: false,
    },
  ];
  return (
    <TailwindProvider utilities={utilities}>
      {data.map(x => (
        <AreaBox title={x.title} debug={x.debug} key={x.id}>
          {x.component}
        </AreaBox>
      ))}
    </TailwindProvider>
  );
}

export default App;
