import React, { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native-elements";
import Modal from "react-native-modal";
import RadioForm from "react-native-simple-radio-button";
import { useSelector } from "react-redux";
import StockPreview from "../components/StockPreview";
import { TextInput } from "react-native-gesture-handler";
import { interpolate } from "react-native-reanimated";
import axios from "axios";

export default function Poll({ data, socket }) {
  const [pollData, setPollData] = useState(data);
  const [visible, setVisible] = useState();
  const [aiVisible, setAiVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [numVotes, setNumVotes] = useState("1");
  const question = pollData.type
    ? `Should we ${pollData.action} ${pollData.stock.name} stocks?`
    : "Which stock should we buy?";
  const getOptions = () => {
    const options = [];
    Object.keys(pollData.votes).forEach((key, index) => {
      options.push({ value: index, label: key });
    });
    return options;
  };
  const stocks = useSelector((state) => state.stock);
  const stockSelected = stocks.find(
    (stock) => stock.ticker === pollData?.stock?.ticker
  );
  const username = useSelector((state) => state.auth.username);
  const submitVote = () => {
    const voteTemplate = {
      pollId: pollData.pollId,
      username,
      numVotes: parseInt(numVotes),
    };
    axios
      .post(
        "https://us-central1-aiot-fit-xlab.cloudfunctions.net/voteinsinglepoll",
        {
          id: pollData.pollId,
          votes: parseInt(numVotes),
        }
      )
      .then((res) => {
        voteTemplate.vote = getOptions().find(
          (option) => option.value == selected
        ).label;
        socket.emit("vote", voteTemplate);
        const temp = {
          ...pollData,
          totalVotes: !pollData.totalVotes
            ? voteTemplate.numVotes
            : pollData.totalVotes + voteTemplate.numVotes,
          votes: { ...pollData.votes },
        };
        temp.votes[voteTemplate.vote] = !temp.votes[voteTemplate.vote]
          ? parseInt(numVotes)
          : temp.votes[voteTemplate.vote] + parseInt(numVotes);
        console.log(temp);
        setPollData(temp);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome
            name="question-circle"
            size={30}
            color="grey"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.question}>{question}</Text>
        </View>
        {stockSelected && stockSelected.ticker && (
          <StockPreview
            ticker={stockSelected.ticker}
            data={stockSelected.data}
            price={stockSelected.price}
            change={stockSelected.change}
            range={stockSelected.range}
            name={stockSelected.name}
            style={{ padding: 10, marginTop: 5 }}
          />
        )}

        <View style={styles.results}>
          {Object.keys(pollData.votes).length > 0 ? (
            Object.keys(pollData.votes)
              .sort((a, b) => pollData.votes[a] < pollData.votes[b])
              .map((key, ind) => {
                const numVotes = pollData.votes[key];
                const total = pollData.totalVotes;
                console.log(pollData);
                return ind < 3 ? (
                  <>
                    <Text>
                      {key}: {numVotes}
                    </Text>
                    <View style={styles.bar}>
                      <View
                        style={{
                          backgroundColor: "#69f",
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
                          flex:
                            total == 0
                              ? 0
                              : Math.floor((numVotes / total) * 100),
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: "#fff",
                          borderTopRightRadius: 5,
                          borderBottomRightRadius: 5,
                          flex:
                            total == 0
                              ? 0
                              : Math.floor(((total - numVotes) / total) * 100),
                        }}
                      />
                    </View>
                  </>
                ) : null;
              })
          ) : (
            <Text style={styles.emptyPoll}>Be the first!</Text>
          )}
        </View>
        <Text style={styles.total}>Total Votes: {pollData.totalVotes}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ ...styles.button, flex: 1 }}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.button_text}>Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#3084FF", flex: 1 }}
            onPress={() => setAiVisible(true)}
          >
            <Text style={{ ...styles.button_text, color: "#fff" }}>
              Evaluate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={visible}
        swipeDirection={"down"}
        onSwipeComplete={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <FontAwesome
              name="question-circle"
              size={30}
              color="grey"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.modalHeaderText}>{question}</Text>
          </View>
          <View style={styles.optionsContainer}>
            <RadioForm
              style={styles.radioOptions}
              radio_props={getOptions()}
              initial={0}
              onPress={(value) => {
                setSelected(value);
              }}
            />
            <Text>Number of Votes</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#ddd",
                height: 32,
              }}
              value={numVotes}
              onChangeText={(e) => setNumVotes(e)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              submitVote();
              setVisible(false);
            }}
          >
            <Text style={styles.button_text}>Vote</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={aiVisible}
        swipeDirection={"down"}
        onSwipeComplete={() => setAiVisible(false)}
      >
        <View
          style={{ backgroundColor: "#fff", padding: 30, borderRadius: 20 }}
        >
          <Text style={{ fontSize: 30, fontWeight: "700" }}>
            According to our algorithms, this trading decision is:
          </Text>
          {Math.random() > 0.5 ? (
            <Text style={{ fontSize: 30, fontWeight: "700", color: "#66CD00" }}>
              Recommended
            </Text>
          ) : (
            <Text style={{ fontSize: 30, fontWeight: "700", color: "#FF3232" }}>
              Not Recommended
            </Text>
          )}
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  button_text: {
    textAlign: "center",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  container: {
    backgroundColor: "#eee",
    marginHorizontal: 20,
    padding: 20,
    paddingBottom: 0,
    paddingTop: 10,
    borderRadius: 10,
    height: "88%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
  },
  modalHeader: {
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 5,
  },
  optionsContainer: {
    marginHorizontal: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  question: {
    marginHorizontal: 5,
    fontWeight: "700",
    fontSize: 16,
  },
  bar: {
    flexDirection: "row",
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  total: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  results: {
    flex: 1,
    marginTop: 5,
  },
  emptyPoll: {
    textAlign: "center",
    marginVertical: 25,
  },
});
