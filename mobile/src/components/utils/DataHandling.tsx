import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {AReaItemsT} from './Interfaces';

export const AReaItems = (data: any) => (
  <View>
    <Text>
      When {data.forecast.type} is {data.interval} {data.forecast.value} in{' '}
      {data.city} : use the {data.reaction.type} reaction with{' '}
      {data.reaction.message}
    </Text>
  </View>
);
