import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// UI
import useViews from './src/ui';
import TabsComponent from './src/ui/components/TabsComponent'

//styles
import theme from './src/styles';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = (): JSX.Element => {
  const { useScreens } = useViews();
  const { Welcome, Login, Forgot, Register, Account, AccountDetail } = useScreens();

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' />
      <NativeBaseProvider theme={theme} config={config}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Dashboard'
          >
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Forgot' component={Forgot} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Dashboard' component={TabsComponent} />
            <Stack.Screen name='Account' component={Account} />
            <Stack.Screen name='AccountDetail' component={AccountDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
