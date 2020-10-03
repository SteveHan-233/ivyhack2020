import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "../screens/ChatListScreen";
import Chat from "../screens/ChatScreen";

const Stack = createStackNavigator();

export default function ChatStackNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="ChatListChatListScreen">
      <Stack.Screen name="ChatListScreen" component={ChatList} />
      <Stack.Screen name="ChatScreen" component={Chat} />
    </Stack.Navigator>
  );
}
