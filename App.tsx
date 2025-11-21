import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore';
import { RootStackParamList } from './src/types/navigation';

// Screens
import Login from './src/Auth/Login';
import CreateAccount from './src/Auth/CreateAccount';
import OtpVerify from './src/Auth/OtpVerify';
import CreatePassword from './src/Auth/CreatePassword';
import AccountCreated from './src/Auth/AccountCreated';
import Home from './src/App/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: 'default' }}>
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} options={{ animation: 'slide_from_right' }} />

        {/* App Main Screens */}
        <Stack.Screen name="Home" component={Home} options={{ animation: 'none' }} />
      </Stack.Navigator>
    </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
