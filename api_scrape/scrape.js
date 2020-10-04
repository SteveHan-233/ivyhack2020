const axios = require("axios");
const fs = require("fs");

axios({
  method: "GET",
  url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart",
  headers: {
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "x-rapidapi-key": "79f311e284msh26f6249a4f6a11dp1e1da5jsn3b8dc6d44fd2",
    useQueryString: true,
  },
  params: {
    region: "US",
    interval: "5m",
    symbol: "AAPL",
    range: "1d",
  },
})
  .then((response) => {
    fs.writeFileSync("./AAPL.json", JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
