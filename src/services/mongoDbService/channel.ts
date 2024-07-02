"use server";

import { ChannelWithIdZodSchema } from "@/schemas/mongodb/channel";

import init from ".";

export const findArrayOfChannels = async () => {
  try {
    const db = await init();
    const rawData = await db.collection("tschannels").find().toArray();

    return rawData.map((x) =>
      ChannelWithIdZodSchema.parse({
        ...x,
        _id: x._id.toString(),
      })
    );
  } catch (error) {
    return null;
  }
};
