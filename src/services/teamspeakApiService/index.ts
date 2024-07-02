"use server";

import axios from "axios";

export default axios.create({
  baseURL: process.env.TEAMSPEAK_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.TEAMSPEAK_SERVER_API_TOKEN}`,
  },
});
