import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import io from "socket.io-client";
import ChatBubble from "../components/ChatBubble";
import Modal from "react-native-modal";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import MultiSelect from "react-native-multiple-select";
import RadioForm from "react-native-simple-radio-button";

const items = [
  {
    id: "92iijs7yta",
    name: "Ondo",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun",
  },
  {
    id: "16hbajsabsd",
    name: "Calabar",
  },
  {
    id: "nahs75a5sg",
    name: "Lagos",
  },
  {
    id: "667atsas",
    name: "Maiduguri",
  },
  {
    id: "hsyasajs",
    name: "Anambra",
  },
  {
    id: "djsjudksjd",
    name: "Benue",
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna",
  },
  {
    id: "suudydjsjd",
    name: "Abuja",
  },
];

var radio_props = [
  { label: "Buy", value: 0 },
  { label: "Sell", value: 1 },
];

export default function ChatScreen({ navigation }) {
  const [socket, setSocket] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [visible, setVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const multiSelect = useRef(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    setSocket(io("http://127.0.0.1:4000"));
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected!");
      });
      socket.on("message", (msg) => {
        setChatMessages([...chatMessages, msg]);
      });
    }
  }, [socket, chatMessages]);

  const submitChatMessage = () => {
    if (chatMessage.trim().length != 0) {
      socket.emit("message", chatMessage);
      setChatMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        style={styles.messagesContainer}
        renderItem={({ item, index }) => (
          <ChatBubble key={index} message={item} left={true} />
        )}
      />
      <View style={styles.actionPanel}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}
        >
          <FontAwesome5 name="poll-h" size={28} />
        </TouchableOpacity>
        <TextInput
          style={{ height: 32, width: 320, borderWidth: 1, borderRadius: 5 }}
          autoCorrect={false}
          value={chatMessage}
          onSubmitEditing={() => submitChatMessage()}
          onChangeText={(chatMessage) => {
            setChatMessage(chatMessage);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => submitChatMessage()}
        >
          <Ionicons name="md-send" size={28} />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={visible}
        swipeDirection={"down"}
        onSwipeComplete={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>New Poll</Text>
          </View>
          <View style={styles.pollContainer}>
            <Tabs>
              <Tab heading="Single Stock">
                <Text style={styles.label}>Please select a stock: </Text>
                <MultiSelect
                  // hideTags
                  items={items}
                  uniqueKey="id"
                  ref={multiSelect}
                  single
                  onSelectedItemsChange={(e) => setSelectedItems(e)}
                  selectedItems={selectedItems}
                  selectText="Select Stocks"
                  searchInputPlaceholderText="Search Stocks..."
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#0f0"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{
                    color: "#CCC",
                    marginVertical: 5,
                    padding: 5,
                  }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  styleDropdownMenu={{
                    marginHorizontal: 10,
                  }}
                  styleInputGroup={{ marginHorizontal: 10 }}
                  styleRowList={{
                    marginHorizontal: 20,
                  }}
                />
                {selectedItems.length > 0 && (
                  <View style={styles.questionContainer}>
                    <FontAwesome5 name="question" size={24} />
                    <Text style={styles.question}>
                      Should we{" "}
                      {radio_props
                        .find((prop) => prop.value == selected)
                        .label.toLocaleLowerCase()}{" "}
                      the {items.find((item) => item.id == selectedItems).name}{" "}
                      stock?
                    </Text>
                  </View>
                )}
                <RadioForm
                  style={styles.radioOptions}
                  radio_props={radio_props}
                  initial={0}
                  onPress={(value) => {
                    setSelected(value);
                  }}
                />
              </Tab>
              <Tab heading="Multiple Stocks ">{/* <Tab2 /> */}</Tab>
            </Tabs>
            <Button title="Create Poll" style={styles.createPollButton} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  modalContainer: {
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 5,
  },
  label: {
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 18,
  },
  pollContainer: {
    flex: 1,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "10%",
  },
  question: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  radioOptions: {
    marginHorizontal: "40%",
  },
  createPollButton: {
    marginVertical: 20,
  },
  messagesContainer: {},
  actionPanel: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10,
  },
});
