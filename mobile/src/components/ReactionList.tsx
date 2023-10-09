import React, {useState} from 'react';
import Dropdown from './Dropdown';
import {View} from 'react-native';

const data = require('../config/reactions.json');

type ReactionT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  reaData: string;
};

function ReactionList({
  debugConsole,
  debugScreen,
  reaData,
}: ReactionT): JSX.Element {
  return (
    <View>
      <Dropdown
        label="Reaction List"
        data={data.reactions}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
        reaData={reaData}
      />
    </View>
  );
}

export default ReactionList;
