import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';

export default function ChatBubble({ message, left }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: 3,
      justifyContent: left ? 'flex-start' : 'flex-end',
    },
    avatar: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginHorizontal: 10,
    },
    message: {
      borderRadius: 5,
      backgroundColor: left ? '#eee' : '#69f',
      padding: 10,
      maxWidth: '80%',
    },
  });
  return (
    <Pressable style={styles.container}>
      <View style={styles.avatar}>
        {left && <Avatar rounded source={{ uri: message.pfp }} />}
      </View>
      <View style={styles.message}>
        <Text>{message.message}</Text>
      </View>
      <View style={styles.avatar}>
        {!left && <Avatar rounded source={{ uri: message.pfp }} />}
      </View>
    </Pressable>
  );
}
