import {View} from 'react-native';
import ReactionDropdown from './Dropdown';
import {WeatherData} from './WeatherWidget';

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
      <ReactionDropdown
        label="Reaction List"
        data={data.reactions}
        debugConsole={debugConsole}
        debugScreen={debugScreen}
        weatherData={weatherData}
      />
    </View>
  );
}

export default ReactionList;
