import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './screens/ChatScreen';
import ChatList from './screens/ChatListScreen';
import Login from './screens/Login';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="login" component={Login} />
        <Tab.Screen name="ChatScreen" component={ChatScreen} />
        <Tab.Screen name="ChatList" component={ChatList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
