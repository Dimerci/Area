import React, {useState} from 'react';
import Dropdown from './Dropdown';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

const data = require('../config/reactions.json');

function ReactionList(): JSX.Element {
  return (
    <View>
      <Dropdown label="Reaction List" data={data.reactions} />
    </View>
  );
}

export default ReactionList;
