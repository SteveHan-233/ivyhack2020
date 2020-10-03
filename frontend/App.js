import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ChatList from "./screens/ChatList";
import ChatList from "./screens/ChatListScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="ChatList" component={ChatList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
