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

export default function ChatList({ navigation }) {
  const chats = [
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 0,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 1,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 2,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 3,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 4,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 5,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 6,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 7,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 8,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 9,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 10,
    },
    {
      name: "YEET",
      img: "yeet",
      lastActive: new Date().getTime(),
      lastMessage: {
        from: "YeEt",
        message: "yEEt",
        timestamp: new Date().getTime(),
      },
      uid: 11,
    },
  ];
  navigation.setOptions({ header: () => null, title: "Chats" });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Chats</Text>
      <FlatList
        data={chats}
        renderItem={({ item, index }) => (
          <ChatListItem
            chat={item}
            bottomDivider={index == chats.length - 1}
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
