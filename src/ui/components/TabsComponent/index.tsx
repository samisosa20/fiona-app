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
          paddingTop: 8,
          backgroundColor: '#201D2C',
          borderStartColor: '#201D2C'
        }
      }}
      initialRouteName='Dashboard'
    >
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center' py='2' px='3' rounded='full'>
            <Image source={iconHome} alt="home" w='20px' h='20px' resizeMode="contain" tintColor={ focused ? '#5d5d9c': '#7B7C89'}/>
          </View>),
        }}
      />
      <Tab.Screen
        name='Report'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconReport} alt="home" w='20px' h='20px' resizeMode="contain" tintColor={ focused ? '#5d5d9c': '#7B7C89'}/>
          </View>),
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconSetting} alt="home" w='20px' h='20px' resizeMode="contain" tintColor={ focused ? '#5d5d9c': '#7B7C89'}/>
          </View>),
        }}
      />
      <Tab.Screen
        name='Settingss'
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
          <View alignItems='center' justifyContent='center'>
            <Image source={iconUser} alt="home" w='20px' h='20px' resizeMode="contain" tintColor={ focused ? '#5d5d9c': '#7B7C89'}/>
          </View>),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsComponent;
