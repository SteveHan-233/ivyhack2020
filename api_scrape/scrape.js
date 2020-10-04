const axios = require("axios");
const fs = require("fs");

const stocks = require("../frontend/data/stonks.json");

const all = [];
(async function func() {
  for (let i = 0; i < stocks.length; i++) {
    let stock = stocks[i];
    let ticker = stock.ticker;
    let response = null;
    try {
      response = await axios({
        method: "GET",
        url:
          "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart",
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "79f311e284msh26f6249a4f6a11dp1e1da5jsn3b8dc6d44fd2",
          useQueryString: true,
        },
        params: {
          region: "US",
          interval: "5m",
          symbol: ticker,
          range: "1d",
        },
      });
    } catch (err) {
      console.log(err);
    }
    all.push(response.data);
    // this is the last iteration
    if (i == stocks.length - 1) {
      fs.writeFileSync(
        `../frontend/data/stock_timeseries.json`,
        JSON.stringify(all)
      );
    }
    await sleep(1000);
  }
})();
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
