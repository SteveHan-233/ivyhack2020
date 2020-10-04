import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';
import chatlist from '../chatList.json';

const screenWidth = Dimensions.get('window').width * 0.8;

export default function ProfileScreen({ navigation }) {
  const username = useSelector((state) => state.auth.username);
  const pfp = useSelector((state) => state.auth.pfp);

  const randColor = () => {
    return `rgba(
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)},
      1
    )`;
  };

  const data = [
    {
      name: 'GOOGL',
      population: 30.9225,
      color: randColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'W',
      population: 16.0797,
      color: randColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'COF',
      population: 56.8974,
      color: randColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'IBM',
      population: 19.7904,
      color: randColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Avatar source={{ uri: pfp }} rounded size={200} />
          <Text style={{ fontWeight: '800', color: '#363636', fontSize: 40 }}>
            {username}
          </Text>
        </View>
        <View style={{ ...styles.overview, ...styles.section }}>
          <Text style={styles.sectionLabel}>Overview</Text>
          <PieChart
            data={data}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.left}>
              <Text style={styles.categoryLabel}>Total Invested:</Text>
            </View>
            <View style={styles.right}>
              <Text>$50</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.left}>
              <Text style={styles.categoryLabel}>Current Balance:</Text>
            </View>
            <View style={styles.right}>
              <Text>$123.69</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.left}>
              <Text style={styles.categoryLabel}>% Change:</Text>
            </View>
            <View style={styles.right}>
              <Text style={{ color: '#060', fontWeight: 'bold' }}>147.38%</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.groups, ...styles.section }}>
          <Text style={styles.sectionLabel}>Groups</Text>
          <FlatList
            data={[
              {
                name: 'Stonks Squad',
                uri:
                  'https://pbs.twimg.com/profile_images/1149577551708184576/6KG41LLu_400x400.jpg',
              },
              ...chatlist,
            ]}
            renderItem={({ item, index }) => (
              <View style={styles.chatContainer}>
                <Avatar rounded source={{ uri: item.uri }} size={45} />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#555',
                  }}
                >
                  {item.name}
                </Text>
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
    // flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  section: {
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  overview: {
    width: 350,
  },
  left: {
    flex: 2,
    borderRightWidth: 1,
  },
  right: {
    flex: 1,
    alignItems: 'center',
  },
  groups: {
    height: 500,
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 5,
  },
  categoryLabel: {
    fontWeight: 'bold',
  },
  chatContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
