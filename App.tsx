import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// UI
import useViews from './src/ui';

//styles
import theme from './src/styles';

const App = (): JSX.Element => {
  const { useScreens } = useViews();
  const { Home, Login } = useScreens();

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Home'
          >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Login' component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
