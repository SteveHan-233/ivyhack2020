import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import ChatStack from '../navigation/ChatStackNavigator';
import Stock from '../screens/Stock';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function RootBottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="StockStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'ChatStack':
              iconName = 'bubbles';
              break;
            case 'StockStack':
              iconName = 'graph';
              break;
            case 'ProfileStack':
              iconName = 'user';
              break;
          }

          return <SimpleLineIcons name={iconName} size={size} color={color} />;
        },
        lazy: false,
      })}
      tabBarOptions={{
        activeTintColor: '#69f',
        inactiveTintColor: '#666',
        labelStyle: {
          fontWeight: 'bold',
        },
        style: {
          shadowColor: '#3084FF',
          shadowOpacity: 0.15,
          shadowRadius: 20,
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="StockStack"
        component={Stock}
        options={{
          tabBarLabel: 'Stocks',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
