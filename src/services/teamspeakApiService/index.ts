import axios from "axios";

export default axios.create({
  baseURL: process.env.TEAMSPEAK_API_URL,
});
