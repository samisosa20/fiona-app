import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';

// Configuration
import useConfig from './src/config';

// UI
import useViews from './src/ui';
import TabsComponent from './src/ui/components/TabsComponent';

//styles
import theme from './src/styles';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
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
    Category,
    CategoryDetail,
    CategoryCreate,
    Payment,
    PaymentCreate
  } = useScreens();
  const Stack = createNativeStackNavigator();

  // Config
  const { useStoreConfig, useInterceptor } = useConfig();
  const { store, persistor } = useStoreConfig();
  useInterceptor(store);

  const [fontsLoaded] = useFonts({
    'Poppins': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
  });

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
                <Stack.Screen name='Category' component={Category} />
                <Stack.Screen name='CategoryDetail' component={CategoryDetail} />
                <Stack.Screen name='CategoryCreate' component={CategoryCreate} />
                <Stack.Screen name='Payment' component={Payment} />
                <Stack.Screen name='PaymentCreate' component={PaymentCreate} />
              </Stack.Navigator>
            </NavigationContainer>
            <Toast />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
