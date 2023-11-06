import React from 'react';
import {Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Box} from '../components/utils/Box';
import {BackendAPISettings} from '../components/settings/BackendAPIIPSetting';
import {ScrollView} from 'react-native';
import {ReactionSettings} from '../components/settings/ReactionSettings';
import {ActionSettings} from '../components/settings/ActionSettings';
import {VisualSettings} from '../components/settings/VisibleSettings';

export function SettingsPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <ScrollView>
      <Text style={tailwind('font-black mx-1 p-2 text-lg')}>Settings</Text>
      <Box title={'IP configuration'}>
        <BackendAPISettings />
      </Box>
      <Box title={'Action configuration'}>
        <ActionSettings />
      </Box>
      <Box title={'Reaction configuration'}>
        <ReactionSettings />
      </Box>
      <Box title={'Visual configuration'}>
        <VisualSettings />
      </Box>
    </ScrollView>
  );
}
