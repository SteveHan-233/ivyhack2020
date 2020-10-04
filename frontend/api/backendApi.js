import axios from 'axios';

export default axios.create({
  baseURL: 'http://59231cc14999.ngrok.io',
  responseType: 'json',
});
