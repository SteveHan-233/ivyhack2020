import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import ChatListItem from "../components/ChatListItem";
import organizers from "../chatList.json";

export default function ChatList({ navigation }) {
  const [chatData, setChatData] = useState({
    name: "Stonks Squad",
    uri:
      "https://pbs.twimg.com/profile_images/1149577551708184576/6KG41LLu_400x400.jpg",
    lastMessage: {
      from: "",
      message: "",
      time: "",
    },
  });
  navigation.setOptions({ header: () => null, title: "Chats" });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Chats</Text>
      <ChatListItem
        key={-1}
        chat={chatData}
        setChatData={setChatData}
        bottomDivider={false}
        navigation={navigation}
      />
      <FlatList
        data={organizers}
        renderItem={({ item, index }) => (
          <ChatListItem
            key={index}
            chat={item}
            bottomDivider={index == organizers.length - 1}
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10,
  },
});
