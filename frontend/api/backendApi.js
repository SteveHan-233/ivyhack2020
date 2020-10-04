import axios from "axios";
import { ngrok } from "../config";

export default axios.create({
  baseURL: ngrok,
  responseType: "json",
});
