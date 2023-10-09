<<<<<<< HEAD
import {View} from 'react-native';
import Dropdown from './Dropdown';
import {WeatherData} from './Interfaces';

const data = require('../config/reactions.json');

type ReactionT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  weatherData?: WeatherData;
};

function ReactionList({
  debugConsole,
  debugScreen,
  weatherData,
}: ReactionT): JSX.Element {
  return (
    <View>
      <Dropdown
        label="Reaction List"
        data={data.reactions}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
        weatherData={weatherData}
      />
=======
import React, {useState} from 'react';
import Dropdown from './Dropdown';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

const data = require('../config/reactions.json');

function ReactionList(): JSX.Element {
  return (
    <View>
      <Dropdown label="Reaction List" data={data.reactions} />
>>>>>>> d995963 ([ADD] Added the reaction template and worked on the Weather Widget)
    </View>
  );
}

export default ReactionList;
