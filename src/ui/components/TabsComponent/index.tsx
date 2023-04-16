import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'native-base';

// Screens
import useScreens from '../../screens';

// Icon
import iconHome from '../../../assets/icons/icon-home.png'
import iconUser from '../../../assets/icons/icon-user.png'
import iconSetting from '../../../assets/icons/icon-setting.png'
import iconReport from '../../../assets/icons/icon-report.png'

const TabsComponent = () => {
  const Tab = createBottomTabNavigator();

  const { Account } = useScreens();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 15,
          height: 80
        }
      }}
      initialRouteName='Dashboard'
    >
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconHome} alt="home" w='25' h='25' resizeMode="contain" tintColor={ focused ? 'black': 'blue'}/>
            <Text fontSize='10' color={ focused ? 'black': 'blue'}>Home</Text>
          </View>),
        }}
      />
      <Tab.Screen
        name='Report'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconReport} alt="home" w='25' h='25' resizeMode="contain" tintColor={ focused ? 'black': 'blue'}/>
            <Text fontSize='10' color={ focused ? 'black': 'blue'}>Reportes</Text>
          </View>),
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconSetting} alt="home" w='25' h='25' resizeMode="contain" tintColor={ focused ? 'black': 'blue'}/>
            <Text fontSize='10' color={ focused ? 'black': 'blue'}>Configuraciones</Text>
          </View>),
        }}
      />
      <Tab.Screen
        name='Settingss'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconUser} alt="home" w='25' h='25' resizeMode="contain" tintColor={ focused ? 'black': 'blue'}/>
            <Text fontSize='10' color={ focused ? 'black': 'blue'}>Perfil</Text>
          </View>),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsComponent;
