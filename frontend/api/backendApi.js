import axios from "axios";

export default axios.create({
  baseURL: "http://321028fedbd0.ngrok.io",
  responseType: "json",
});
