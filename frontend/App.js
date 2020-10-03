import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import ChatScreen from "./screens/ChatScreen";
import ChatList from "./screens/ChatListScreen";
import RootBottomNavigator from "./navigation/RootBottomNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return <RootBottomNavigator />;
}
