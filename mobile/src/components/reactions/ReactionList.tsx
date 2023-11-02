import {View} from 'react-native';
import Dropdown from '../utils/Dropdown';
import {ActionData} from '../utils/Interfaces';

const data = require('../../config/reactions.json');

type ReactionT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  actionData: ActionData;
};

function ReactionList({
  debugConsole,
  debugScreen,
  actionData,
}: ReactionT): JSX.Element {
  return (
    <View>
      <Dropdown
        label="Reaction List"
        data={data.reactions}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
        actionData={actionData}
      />
    </View>
  );
}

export default ReactionList;
