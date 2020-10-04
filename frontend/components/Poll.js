import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import Modal from "react-native-modal";
import RadioForm from "react-native-simple-radio-button";
// import Button from "./Button";

export default function Poll({ data }) {
  const [visible, setVisible] = useState();
  const [selected, setSelected] = useState(0);
  const getOptions = () => {
    const options = [];
    Object.keys(data.votes).forEach((key, index) => {
      options.push({ value: index, label: key });
    });
    return options;
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="question-circle" size={16} />
          <Text style={styles.question}>{data.question}</Text>
        </View>
        <View style={styles.results}>
          {Object.keys(data.votes).map((key) => {
            const numVotes = data.votes[key];
            const totalVotes = data.totalVotes;
            return (
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
                        totalVotes == 0
                          ? 0
                          : Math.floor((numVotes / totalVotes) * 100),
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      flex:
                        totalVotes == 0
                          ? 0
                          : Math.floor(
                              ((totalVotes - numVotes) / totalVotes) * 100
                            ),
                    }}
                  />
                </View>
              </>
            );
          })}
          <Text style={styles.total}>Total Votes: {data.totalVotes}</Text>
        </View>
        <Button title="Vote" onPress={() => setVisible(true)} />
      </View>
      <Modal
        isVisible={visible}
        swipeDirection={"down"}
        onSwipeComplete={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <FontAwesome name="question-circle" size={24} />
            <Text style={styles.modalHeaderText}>{data.question}</Text>
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
          </View>
          <Button title="Submit Vote" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    // height: "60%",
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  modalHeader: {
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5,
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 5,
  },
  optionsContainer: {
    marginHorizontal: 15,
  },
  header: {
    flexDirection: "row",
  },
  question: {
    marginHorizontal: 5,
    fontWeight: "bold",
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
});
