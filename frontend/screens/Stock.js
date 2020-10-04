import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import Container from '../components/Container';
import { SlideAreaChart } from 'react-native-slide-charts';
import { useSelector } from 'react-redux';
import StockPreview from '../components/StockPreview';
import BlurredStatusBar from '../components/BlurredStatusBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import StockDetail from '../components/StockDetail';

const Stock = () => {
  const stocks = useSelector((state) => state.stock);

  const [stockSelected, setStockSelected] = useState(null);

  const sheetRef = React.useRef(null);

  const renderContent = ({ stockSelected }) => {
    return stockSelected ? (
      <StockDetail
        ticker={stockSelected.ticker}
        data={stockSelected.data}
        price={stockSelected.price}
        change={stockSelected.change}
        range={stockSelected.range}
        name={stockSelected.name}
        key={stockSelected.ticker}
      />
    ) : null;
  };
  return (
    <>
      <BlurredStatusBar
        children={
          <Container>
            <Text h1 h1Style={{ fontWeight: '800', marginBottom: 20 }}>
              Stocks
            </Text>

            {stocks?.map((stock) => (
              <TouchableOpacity
                onPress={() => {
                  setStockSelected(stock);
                  sheetRef.current.snapTo(0);
                }}
              >
                <StockPreview
                  ticker={stock.ticker}
                  data={stock.data}
                  price={stock.price}
                  change={stock.change}
                  range={stock.range}
                  key={stock.ticker}
                />
              </TouchableOpacity>
            ))}
          </Container>
        }
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[550, 400, 0]}
        borderRadius={20}
        renderContent={() => renderContent({ stockSelected })}
        initialSnap={2}
      />
    </>
  );
};

export default Stock;
