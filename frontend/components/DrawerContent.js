import React from "react";
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import chatlist from "../chatList.json";

export default function DrawerContent({ navigation, chat }) {
  const members = [
    {
      name: "Timotea",
      uri:
        "https://i.pinimg.com/originals/83/1e/4c/831e4ca78b97ee3c646c8244061f0b3b.jpg",
    },
    {
      name: "Steve",
      uri:
        "https://static.onecms.io/wp-content/uploads/sites/13/2017/09/05/nbc-jim-e1504308450475.jpg",
    },
    {
      name: "Cameron",
      uri:
        "https://static0.srcdn.com/wordpress/wp-content/uploads/2019/09/The-Office-Dwight-Feature.jpg",
    },
    {
      name: "Muntaser",
      uri:
        "https://imgix.bustle.com/uploads/image/2019/5/28/44774e68-1522-49ec-87c8-6c966a499b8c-pamtheoffice.png?w=1020&h=574&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70",
    },
    {
      name: "StonkBot",
      uri:
        "https://pbs.twimg.com/profile_images/1149577551708184576/6KG41LLu_400x400.jpg",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Avatar source={{ uri: chat.chat.uri }} rounded size={200} />
          <Text style={{ fontWeight: "bold", color: "#363636", fontSize: 32 }}>
            {chat.chat.name}
          </Text>
        </View>
        <View style={{ ...styles.groups, margin: 5 }}>
          <Text style={styles.sectionLabel}>Members</Text>
          <FlatList
            data={members}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.chatContainer}>
                <Avatar rounded source={{ uri: item.uri }} size={45} />
                <Text style={{ marginLeft: 5, fontSize: 26 }}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  section: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overview: {
    width: 390,
  },
  left: {
    flex: 2,
    borderRightWidth: 1,
  },
  right: {
    flex: 1,
    alignItems: "center",
  },
  groups: {
    height: 400,
  },
  sectionLabel: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 5,
  },
  categoryLabel: {
    fontWeight: "bold",
  },
  chatContainer: {
    flexDirection: "row",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
