import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SlideAreaChart } from 'react-native-slide-charts';
import { LinearGradient, Stop } from 'react-native-svg';

const StockPreview = ({ ticker, data, price, change, range }) => {
  const color = change > 0 ? '#66CD00' : '#FF3232';
  const fillGradient = (props) => {
    return (
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...props}>
        <Stop stopColor={color} offset="0%" stopOpacity="0.2" />
        <Stop stopColor="#FFFFFF" offset="100%" stopOpacity="0.2" />
      </LinearGradient>
    );
  };
  return (
    <View style={[styles.bg, { shadowColor: '#333' }]}>
      <View>
        <Text style={styles.ticker}>{ticker}</Text>
        <Text style={[styles.price, { color: color }]}>${price}</Text>
      </View>
      <SlideAreaChart
        data={data}
        width={200}
        height={70}
        yRange={range}
        style={{ backgroundColor: '#fff' }}
        renderFillGradient={fillGradient}
        alwaysShowIndicator={false}
        chartLineColor={color}
        yAxisProps={{
          showBaseLine: false,
          verticalLineWidth: 0,
        }}
        cursorProps={{ displayCursor: false }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 30,
    padding: 30,
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  ticker: {
    fontSize: 20,
    fontWeight: '700',
  },
  price: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default StockPreview;
