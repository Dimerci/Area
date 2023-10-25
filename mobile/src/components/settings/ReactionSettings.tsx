import {View} from 'react-native';
import {Box} from '../Box';
import {DiscordSetting} from './DiscordSetting';

export function ReactionSettings() {
  return (
    <View>
      <Box title={'Discord'}>
        <DiscordSetting />
      </Box>
    </View>
  );
}
