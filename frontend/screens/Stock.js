import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import Container from '../components/Container';
import { SlideAreaChart } from 'react-native-slide-charts';

const data = require('../api/AAPL.json');
const x = data.chart.result[0].timestamp.map(
  (timestamp) => new Date(timestamp * 1000)
);
const y = data.chart.result[0].indicators.quote[0].open;
const range = [Math.max(...y), Math.min(...y)];
const processed_data = x.map((timestamp, i) => {
  return { x: timestamp, y: y[i] };
});
const Stock = () => {
  return (
    <Container
      children={
        <>
          <Text h1 h1Style={{ fontWeight: '700' }}>
            Stocks
          </Text>
          <SlideAreaChart
            data={processed_data}
            width={Dimensions.get('window').width - 60}
            yRange={range}
            style={{ backgroundColor: 'none' }}
          />
        </>
      }
    />
  );
};

export default Stock;
