const loadStocks = () => (dispatch) => {
  const stocks = require('../data/stonks.json');
  const stock_timeseries = require('../data/stock_timeseries.json');
  for (let i = 0; i < stocks.length; i++) {
    const stock = stocks[i];
    const data = stock_timeseries[i];
    const x = data.chart.result[0].timestamp.map(
      (timestamp) => new Date(timestamp * 1000)
    );
    const y = data.chart.result[0].indicators.quote[0].open;
    const range = [Math.max(...y), Math.min(...y)];
    const processed_data = x.map((timestamp, i) => {
      return { x: timestamp, y: y[i] };
    });
    const price = y[y.length - 1];
    const change = (price - y[0]) / y[0];
    dispatch({
      type: 'add_stock',
      payload: { ...stock, data: processed_data, range, price, change },
    });
  }
};

export { loadStocks };
