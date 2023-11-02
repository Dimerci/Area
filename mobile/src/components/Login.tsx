import {Button} from 'react-native-elements';
import {useAuth0} from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

type loginT = {
  loginState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LoginButton({loginState}: loginT): JSX.Element {
  const {authorize} = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
      try {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        loginState(true);
        console.log('logged in');
      } catch (error) {
        console.error('Error saving saving logging in:', error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />;
}
