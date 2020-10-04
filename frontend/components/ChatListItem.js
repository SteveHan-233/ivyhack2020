import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import moment from "moment";

export default function ChatListItem({
  navigation,
  chat,
  bottomDivider,
  setChatData,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen", {
          chat,
          setChatData,
        });
      }}
    >
      <ListItem key={chat.name} topDivider bottomDivider={bottomDivider}>
        <Avatar rounded source={{ uri: chat.uri }} size={64} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {chat.name}
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={{ fontWeight: "bold" }}>{chat.lastMessage.from}:</Text>{" "}
            {chat.lastMessage.message}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text>{moment(chat.lastMessage.time).fromNow()}</Text>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}
