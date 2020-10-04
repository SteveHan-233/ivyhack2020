import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chat from "../screens/ChatScreen";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export default function ChatDrawerNavigator({ navigation, route }) {
  navigation.setOptions({ title: route.params.chat.name });

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={() => <DrawerContent chat={route.params} />}
    >
      <Drawer.Screen
        name="Chat"
        component={Chat}
        initialParams={route.params}
      />
    </Drawer.Navigator>
  );
}
