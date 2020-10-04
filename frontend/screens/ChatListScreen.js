import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements';
import ChatListItem from '../components/ChatListItem';
import organizers from '../chatList.json';

export default function ChatList({ navigation }) {
  const [chatData, setChatData] = useState({
    name: 'Stonks Squad',
    uri:
      'https://pbs.twimg.com/profile_images/1149577551708184576/6KG41LLu_400x400.jpg',
    lastMessage: {
      from: 'StonkBot',
      message: 'Welcome to Stonks Squad!',
      time: new Date().getTime(),
    },
  });
  navigation.setOptions({ header: () => null, title: 'Chats' });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          h1
          h1Style={{
            fontWeight: '800',
            fontSize: 50,
          }}
        >
          Groups
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={36} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    flex: 1,
  },
  addButton: {
    marginHorizontal: 10,
  },
});
