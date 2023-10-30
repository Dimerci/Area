import {View} from 'react-native';
import {Box} from '../Box';
import {ChuckSettings} from './ChuckSettings';
import {WeatherSettings} from './WeatherSettings copy';

export function ActionSettings() {
  return (
    <View>
      <Box title={'Weather Settings'}>
        <WeatherSettings />
      </Box>
      <Box title={'Chuck Norris Settings'}>
        <ChuckSettings />
      </Box>
    </View>
  );
}
