import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';

export const AReaItems = ({item}: any) => {
  const tailwind = useTailwind();
  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>Reaction : </Text>
      <View style={tailwind('rounded-lg border-2 my-2 mx-2 p-2')}>
        <Text style={tailwind('mx-2 text-slate-50')}>
          When {item.forecast.type} is {item.interval} {item.forecast.value} in{' '}
          {item.city} : use the {item.reaction.type} reaction with{' '}
          {item.reaction.message}
        </Text>
      </View>
      <Text>=====================</Text>
    </View>
  );
};
