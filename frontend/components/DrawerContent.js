import React from "react";
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import stonks from "../stonks_squad.json";
import { SlideAreaChart } from "react-native-slide-charts";

export default function DrawerContent({ navigation, chat }) {
  const members = [
    {
      name: "Timotea",
      uri:
        "https://i.pinimg.com/originals/83/1e/4c/831e4ca78b97ee3c646c8244061f0b3b.jpg",
      val: 96,
    },
    {
      name: "Steve",
      uri:
        "https://static.onecms.io/wp-content/uploads/sites/13/2017/09/05/nbc-jim-e1504308450475.jpg",
      val: 116,
    },
    {
      name: "Cameron",
      uri:
        "https://static0.srcdn.com/wordpress/wp-content/uploads/2019/09/The-Office-Dwight-Feature.jpg",
      val: 83,
    },
    {
      name: "Muntaser",
      uri:
        "https://imgix.bustle.com/uploads/image/2019/5/28/44774e68-1522-49ec-87c8-6c966a499b8c-pamtheoffice.png?w=1020&h=574&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70",
      val: 126,
    },
    {
      name: "StonkBot",
      uri:
        "https://pbs.twimg.com/profile_images/1149577551708184576/6KG41LLu_400x400.jpg",
    },
  ];

  const getNetChange = (data) => {
    const change = (
      ((data[data.length - 1].y - data[0].y) / data[0].y) *
      100
    ).toFixed(2);
    return (
      <Text
        style={{
          fontWeight: "bold",
          color: change == 0 ? "#000" : change > 0 ? "#060" : "#f69",
        }}
      >
        {change}%
      </Text>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Avatar source={{ uri: chat.chat.uri }} rounded size={200} />
          <Text style={{ fontWeight: "bold", color: "#363636", fontSize: 32 }}>
            {chat.chat.name}
          </Text>
        </View>
        <SlideAreaChart
          data={stonks}
          width={200}
          height={100}
          toolTipProps={{
            displayTriangle: false,
            fontSize: 15,
            borderRadius: 10,
            toolTipTextRenderers: [
              ({ x, y, scaleX, scaleY }) => {
                return {
                  text:
                    "" +
                    new Date(scaleX.invert(x)).toLocaleDateString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }) +
                    "\n$" +
                    scaleY.invert(y).toFixed(2),
                };
              },
            ],
          }}
        />
        <View style={styles.stats}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text>Net Change (3 months): </Text>
            <Text>Current Account: </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text>{getNetChange(stonks)}</Text>
            <Text>${stonks[stonks.length - 1].y.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ ...styles.groups, margin: 5 }}>
          <Text style={styles.sectionLabel}>Members</Text>
          <FlatList
            data={members}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.chatContainer}>
                <Avatar rounded source={{ uri: item.uri }} size={45} />
                <Text style={{ marginLeft: 5, fontSize: 26, flex: 1 }}>
                  {item.name}
                </Text>
                {item.val && (
                  <View style={{ borderLeftWidth: 1, width: 50 }}>
                    <Text style={{ fontSize: 26, textAlign: "center" }}>
                      {item.val}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginVertical: 50,
  },
  section: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overview: {
    width: 390,
  },
  left: {
    flex: 2,
    borderRightWidth: 1,
  },
  right: {
    flex: 1,
    alignItems: "center",
  },
  groups: {
    height: 400,
  },
  sectionLabel: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 5,
  },
  categoryLabel: {
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
  },
  chatContainer: {
    flexDirection: "row",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    width: 240,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
