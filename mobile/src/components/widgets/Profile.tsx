import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {getUserData} from '../../apiHandling/userAPI';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth0} from 'react-native-auth0';

type WeatherWidgetT = {
  children?: React.ReactNode; // Define children prop
};

export function ProfileWidget({}: WeatherWidgetT): JSX.Element {
  const tailwind = useTailwind();
  const [userData, setUserData] = useState(null);
  const [backendIP, setbackendIp] = useState('localhost');
  const {user} = useAuth0();

  AsyncStorage.getItem('backendIP')
    .then(backendIp => {
      if (backendIp) {
        setbackendIp(backendIp);
      } else {
        console.log('IP not found');
        setbackendIp('localhost');
      }
    })
    .catch(error => {
      console.error('Error retrieving backendIP:', error);
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email) {
          const data = await getUserData(user?.email, backendIP);
          setUserData(data);
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once on component mount

  return (
    <View>
      <Text style={tailwind('mx-1 text-slate-50')}>Your Profile :</Text>
      <View style={tailwind('mx-2')}>
        {userData ? (
          <View>
            <Text>User Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
            {/* Add more fields as needed */}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
}
