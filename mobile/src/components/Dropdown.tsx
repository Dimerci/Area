import {FC, ReactElement, useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, Modal, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Discord} from './Discord';
import {SettingsRea, WeatherData} from './Interfaces';

interface Props {
  label: string;
  data: Array<{
    label: string;
    value: string;
    component: ReactElement;
    id: number;
  }>;
  debugScreen?: boolean;
  debugConsole?: boolean;
  weatherData?: WeatherData;
  settings: SettingsRea;
}
interface NormalDropdownProps {
  label: string;
  data: Array<{
    label: string;
    value: string;
  }>;
  onSelect: (item: {label: string; value: string}) => void;
}

const Dropdown: FC<Props> = ({
  label,
  data,
  debugConsole,
  debugScreen,
  weatherData,
  settings,
}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [id, setId] = useState(0);
  const [dropdownTop, setDropdownTop] = useState(0);
  const tailwind = useTailwind();
  const [selectedReaction, setSelectedReaction] = useState(null);

  const componentMapping = {
    Discord: () => (
      <Discord
        debugConsole={debugConsole}
        debugScreen={debugScreen}
        weatherData={weatherData}
        settings={settings}
      />
    ),
    Test: () => <Text>Test</Text>,
  };

  const handleSelect = item => {
    setId(item.id);
    setSelectedReaction(item);
  };

  const componentIdentifier = data[id].component; // "<Discord/>" or "<Text>Test</Text>"

  const SelectedComponent = componentMapping[componentIdentifier];

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item): void => {
    setSelected(item);
    handleSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}): ReactElement<any, any> => (
    <TouchableOpacity
      style={tailwind('py-2 px-5 border-b-2')}
      onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={tailwind('flex-1')}
          onPress={() => setVisible(false)}>
          <View style={[tailwind('absolute bg-slate-600'), {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View>
      <TouchableOpacity
        ref={DropdownButton}
        style={tailwind('bg-slate-500 rounded-lg p-2 mx-1 mb-2')}
        onPress={toggleDropdown}>
        {renderDropdown()}
        <Text style={tailwind('text-slate-50')}>
          {(selected && selected.label) || label}
        </Text>
      </TouchableOpacity>

      {/* Render the selected component conditionally */}
      {selectedReaction && <SelectedComponent />}
    </View>
  );
};
export const NormalDropdown: FC<NormalDropdownProps> = ({
  label,
  data,
  onSelect,
}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const tailwind = useTailwind();

  const handleSelect = item => {
    onSelect(item);
  };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item): void => {
    setSelected(item);
    handleSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}): ReactElement<any, any> => (
    <TouchableOpacity
      style={tailwind('py-2 px-5 border-b-2')}
      onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={tailwind('flex-1')}
          onPress={() => setVisible(false)}>
          <View
            style={[
              tailwind('absolute bg-slate-600 my-auto'),
              {top: dropdownTop},
            ]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View>
      <TouchableOpacity
        ref={DropdownButton}
        style={tailwind('bg-slate-500 rounded-lg p-2 mx-1 mb-2')}
        onPress={toggleDropdown}>
        {renderDropdown()}
        <Text style={tailwind('text-slate-50')}>
          {(selected && selected.label) || label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dropdown;
