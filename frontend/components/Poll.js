import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "react-native-elements";

export default function Poll({ data }) {
  return (
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
      <Button title="Vote" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    margin: 20,
    padding: 10,
    borderRadius: 10,
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
