import {View} from 'react-native';
import {Box} from '../utils/Box';
import {WeatherSettings} from './WeatherSettings copy';

export function ActionSettings() {
  return (
    <View>
      <Box title={'Weather Settings'}>
        <WeatherSettings />
      </Box>
    </View>
  );
}
