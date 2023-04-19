import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

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
  const { useScreens } = useViews();
  const {
    Welcome,
    Login,
    Forgot,
    Register,
    Account,
    AccountDetail,
    AccountCreate,
    Event,
    EventDetail,
    EventCreate,
    Heritage,
    HeritageDetail,
    HeritageCreate,
  } = useScreens();
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
                <Stack.Screen name='AccountCreate' component={AccountCreate} />
                <Stack.Screen name='Event' component={Event} />
                <Stack.Screen name='EventDetail' component={EventDetail} />
                <Stack.Screen name='EventCreate' component={EventCreate} />
                <Stack.Screen name='Heritage' component={Heritage} />
                <Stack.Screen name='HeritageDetail' component={HeritageDetail} />
                <Stack.Screen name='HeritageCreate' component={HeritageCreate} />
              </Stack.Navigator>
            </NavigationContainer>
            <Toast />
            {/* <Modal
              isOpen={true}
              _backdrop={{
                _dark: {
                  bg: 'coolGray.800',
                },
                bg: 'warmGray.50',
              }}
            >
              <Modal.Content maxWidth='350' maxH='212'>
                <Modal.Header>Upsss!</Modal.Header>
                <Modal.Body>
                  Tu sesion ha expirado, deberas volver a inicar sesion.
                  <Button onPress={() => {}} bg='info.400' mt='4'>
                    Salir
                  </Button>
                </Modal.Body>
              </Modal.Content>
            </Modal> */}
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
