import getStockTimeseries from './getStockTimeseries.mjs';
import fs from 'fs';

getStockTimeseries('APPL')
  .then((res) => fs.writeFileSync('./APPL.json', JSON.stringify(res.body)))
  .catch((err) => {
    console.log(err.message);
  });
