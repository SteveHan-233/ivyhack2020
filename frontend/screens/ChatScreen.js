import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import io from 'socket.io-client';
import ChatBubble from '../components/ChatBubble';
import Modal from 'react-native-modal';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import RadioForm from 'react-native-simple-radio-button';
import Poll from '../components/Poll';
import { ngrok } from '../config';
import stocks from '../data/stonks';
import axios from 'axios';
import Swiper from 'react-native-swiper';

var buySell = [
  { label: 'Buy', value: 0 },
  { label: 'Sell', value: 1 },
];

export default function ChatScreen({ navigation, route }) {
  const [socket, setSocket] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const [visible, setVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const multiSelect = useRef(null);
  const [selected, setSelected] = useState(0);
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    setSocket(io(ngrok));
    return () => socket?.disconnect();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected!');
      });
      socket.on('init', (data) => {
        setChatMessages(data.messages);
        setPolls(data.polls);
        console.log(data);
      });
      socket.on('message', (msg) => {
        // Messages need type (poll, messsage, advice from bot)
        setChatMessages([...chatMessages, msg]);
      });
      socket.on('poll', (poll) => {
        setPolls([...polls, poll]);
      });
    }
  }, [socket, chatMessages]);

  const submitChatMessage = () => {
    if (chatMessage.trim().length != 0) {
      socket.emit('message', chatMessage);
      setChatMessage('');
    }
  };

  const createPoll = (id) => {
    const pollTemplate = {
      pollId: id,
      totalVotes: 0,
      voters: [],
      votes: {},
      type: selected >= 0,
      stock: getStockById(selectedItems),
      action: buySell
        .find((prop) => prop.value == selected)
        .label.toLocaleLowerCase(),
    };
    socket.emit('poll', pollTemplate);
  };

  const getStockById = (id) => {
    return stocks.find((item) => item.id == id);
  };

  navigation.setOptions({ title: route.params.groupName });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: polls.length == 0 ? '10%' : '40%',
        }}
      >
        <Text style={styles.pollsHeader}>Polls</Text>
        {polls.length > 0 ? (
          <>
            <Swiper>
              <Poll
                data={{
                  pollId: 69,
                  type: true,
                  stock: {
                    id: 1,
                    ticker: 'IBM',
                    name: 'IBM',
                  },
                  action: 'sell',
                  votes: {
                    yes: 14,
                    dick: 69,
                    no: 1,
                  },
                  voters: [],
                  totalVotes: 84,
                }}
              />
              {polls.map((poll) => {
                return <Poll key={poll.id} data={poll} />;
              })}
            </Swiper>
          </>
        ) : (
          <Text style={styles.pollsAltText}>
            There are no active polls for this group.
          </Text>
        )}
      </View>
      <Text style={styles.pollsHeader}>Chat</Text>
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
        swipeDirection={'down'}
        onSwipeComplete={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>New Poll</Text>
          </View>
          <View style={styles.date}></View>
          <View style={styles.pollContainer}>
            <Tabs>
              <Tab heading="Single Stock">
                <Text style={styles.label}>Please select a stock: </Text>
                <MultiSelect
                  // hideTags
                  items={stocks}
                  uniqueKey="id"
                  ref={multiSelect}
                  single
                  onSelectedItemsChange={(e) => setSelectedItems(e)}
                  selectedItems={selectedItems}
                  selectText="Select Stocks"
                  searchInputPlaceholderText="Search Stocks..."
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#0f0"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{
                    color: '#CCC',
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
                {selectedItems.length > 0 && selected >= 0 && (
                  <View style={styles.questionContainer}>
                    <FontAwesome5 name="question" size={24} />
                    <Text style={styles.question}>
                      Should we{' '}
                      {buySell
                        .find((prop) => prop.value == selected)
                        .label.toLocaleLowerCase()}{' '}
                      the {getStockById(selectedItems).name} (
                      {getStockById(selectedItems).ticker}) stock?
                    </Text>
                  </View>
                )}
                <RadioForm
                  style={styles.radioOptions}
                  radio_props={buySell}
                  initial={-1}
                  onPress={(value) => {
                    console.log(value);
                    setSelected(value);
                  }}
                />
              </Tab>
              <Tab heading="Multiple Stocks ">
                <View style={styles.questionContainer}>
                  <FontAwesome5 name="question" size={24} />
                  <Text style={styles.question}>
                    Which stock should we buy?
                  </Text>
                </View>
              </Tab>
            </Tabs>
            <Button
              title="Create Poll"
              onPress={() => {
                const pollData = {
                  type: buySell
                    .find((prop) => prop.value == selected)
                    .label.toLocaleLowerCase(),
                  name: getStockById(selectedItems).name,
                  topic: getStockById(selectedItems).ticker,
                };
                console.log(pollData);
                axios
                  .post(
                    'https://us-central1-aiot-fit-xlab.cloudfunctions.net/addsinglepoll',
                    pollData
                  )
                  .then((res) => res.data)
                  .then((res) => {
                    createPoll(res.id);
                    setSelectedItems([]);
                    setSelected(-1);
                    setVisible(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalContainer: {
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    marginTop: 15,
    fontWeight: 'bold',
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
  pollsHeader: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 28,
    // marginBottom: 5,
    marginHorizontal: 10,
  },
  pollsAltText: {
    marginHorizontal: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 10,
  },
  question: {
    fontSize: 18,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  radioOptions: {
    marginHorizontal: '40%',
  },
  messagesContainer: {},
  actionPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
});
