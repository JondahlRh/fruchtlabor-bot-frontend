"use server";

import { MongoClient } from "mongodb";

const init = async () => {
  const client = new MongoClient(process.env.MONGODB_CONNECT ?? "");
  await client.connect();

  return client.db(process.env.MONGODB_DBNAME);
};

export default init;
