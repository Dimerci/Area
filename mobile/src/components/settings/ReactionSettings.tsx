import {View} from 'react-native';
import {Box} from '../utils/Box';
import {DiscordSetting} from './DiscordSetting';

export function ReactionSettings() {
  return (
    <View>
      <Box title={'Discord Settings'}>
        <DiscordSetting />
      </Box>
    </View>
  );
}
