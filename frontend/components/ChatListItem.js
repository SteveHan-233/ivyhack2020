import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

export default function ChatListItem({ navigation, chat, bottomDivider }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen", {
          chatId: chat.uid,
          groupName: "Stonks",
        });
      }}
    >
      <ListItem key={chat.uid} topDivider bottomDivider={bottomDivider}>
        <Avatar rounded source={{ uri: chat.img }} />
        <ListItem.Content>
          <ListItem.Title>{chat.name}</ListItem.Title>
          <ListItem.Subtitle>
            {chat.lastMessage.from}: {chat.lastMessage.message}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text>YEET</Text>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}
