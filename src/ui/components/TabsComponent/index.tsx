import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, AddIcon, IconButton } from 'native-base';

// Screens
import useScreens from '../../screens';

// Icon
import iconHome from '../../../assets/icons/icon-home.png';
import iconUser from '../../../assets/icons/icon-user.png';
import iconSetting from '../../../assets/icons/icon-setting.png';
import iconReport from '../../../assets/icons/icon-report.png';

const TabsComponent = () => {
  const Tab = createBottomTabNavigator();

  const { Home, Report, Setting, Profile, Movement } = useScreens();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 8,
          backgroundColor: '#201D2C',
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems='center' justifyContent='center' py='2' px='3' rounded='full'>
              <Image
                source={iconHome}
                alt='home'
                w='20px'
                h='20px'
                resizeMode='contain'
                tintColor={focused ? '#5d5d9c' : '#7B7C89'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Report'
        component={Report}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems='center' justifyContent='center'>
              <Image
                source={iconReport}
                alt='reporte'
                w='20px'
                h='20px'
                resizeMode='contain'
                tintColor={focused ? '#5d5d9c' : '#7B7C89'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Movement'
        component={Movement}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View alignItems='center' justifyContent='center' mb='10'>
              <View borderRadius='full' bg='cyan.400' p='4'>
                <AddIcon size='lg' name='dots-horizontal' color='warmGray.50' />
              </View>
            </View>
          ),
        }}
        listeners={({navigation}) => ({blur: () => navigation.setParams({id: undefined})})}
      />
      <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems='center' justifyContent='center'>
              <Image
                source={iconSetting}
                alt='setting'
                w='20px'
                h='20px'
                resizeMode='contain'
                tintColor={focused ? '#5d5d9c' : '#7B7C89'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems='center' justifyContent='center'>
              <Image
                source={iconUser}
                alt='perfil'
                w='20px'
                h='20px'
                resizeMode='contain'
                tintColor={focused ? '#5d5d9c' : '#7B7C89'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsComponent;
