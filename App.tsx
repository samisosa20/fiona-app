import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Configuration
import useConfig from './src/config';

// UI
import useViews from './src/ui';
import TabsComponent from './src/ui/components/TabsComponent';

//styles
import theme from './src/styles';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  const { useScreens, useComponents } = useViews();
  const { Welcome, Login, Forgot, Register, Account, AccountDetail } = useScreens();
  const { Toast } = useComponents();
  const Stack = createNativeStackNavigator();

  // Config
  const { useStoreConfig, useInterceptor } = useConfig();
  const { store, persistor } = useStoreConfig();
  useInterceptor(store);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider theme={theme} config={config}>
            <Toast />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
                initialRouteName='Welcome'
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
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
