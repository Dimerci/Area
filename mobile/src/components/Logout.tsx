import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth0} from 'react-native-auth0';
import {Button} from 'react-native-elements';

type loginT = {
  loginState: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogOutButton({loginState}: loginT): JSX.Element {
  const {clearSession} = useAuth0();
  const logOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      loginState(false);
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };
  return <Button title="Log Out" onPress={logOut} />;
}

export default LogOutButton;
