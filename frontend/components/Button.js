import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Button({ text, buttonStyle, textStyle, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, ...buttonStyle }}
    >
      <View>
        <Text style={{ ...styles.buttonText, ...textStyle }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 5
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center"
  }
});
