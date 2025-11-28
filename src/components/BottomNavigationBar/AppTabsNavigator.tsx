import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../App/Home';
import Explore from '../../App/Explore';
import record from '../../App/record';
import Notify from '../../App/Notify';
import Profile from '../../App/Profile';

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor:'black' },
        tabBarActiveTintColor: '#B2ED54',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore}/>
      <Tab.Screen name="record" component={record}/>
      <Tab.Screen name="Notify" component={Notify} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default AppTabs;
