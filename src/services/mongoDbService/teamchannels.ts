import { TeamchannelState } from "@/app/beschreibung/teamchannels/components/FormList";
import { Teamchannel, TeamchannelZodSchema } from "@/schemas/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

import init from ".";

let index = 0;

export const mapTeamChannel = (teamChannel: Teamchannel) => {
  return {
    _id: teamChannel._id.toString(),
    name: teamChannel.name,
    type: teamChannel.type,
    links: teamChannel.links.map((link) => ({
      id: Date.now() + index++,
      label: link.label,
      url: link.url,
    })),
    players: teamChannel.players.map((x) => ({
      id: Date.now() + index++,
      name: x,
    })),
    standins: teamChannel.standins.map((x) => ({
      id: Date.now() + index++,
      name: x,
    })),
    trainingTimes: teamChannel.trainingTimes.map((x) => ({
      id: Date.now() + index++,
      name: x,
    })),
    extraBody: teamChannel.extraBody,
  };
};

const antiMapTeamChannel = (teamChannel: TeamchannelState) => {
  return {
    _id: new ObjectId(teamChannel._id),
    name: teamChannel.name,
    type: teamChannel.type,
    links: teamChannel.links.map((link) => ({
      label: link.label,
      url: link.url,
    })),
    players: teamChannel.players.map((x) => x.name),
    standins: teamChannel.standins.map((x) => x.name),
    trainingTimes: teamChannel.trainingTimes.map((x) => x.name),
    extraBody: teamChannel.extraBody,
  };
};

export const findTeamChannels = async () => {
  "use server";

  try {
    const db = await init();
    const collection = db.collection("teamchannels");
    const teamChannels = await collection.find().toArray();
    return z.array(TeamchannelZodSchema).safeParse(teamChannels);
  } catch (error) {
    return null;
  }
};

export const updateOneTeamChannel = async (data: TeamchannelState) => {
  "use server";

  try {
    const antiMap = antiMapTeamChannel(data);
    const mappedData = TeamchannelZodSchema.parse(antiMap);

    const db = await init();
    const collection = db.collection("teamchannels");
    await collection.updateOne({ _id: mappedData._id }, { $set: mappedData });

    return { success: true };
  } catch (error) {
    console.log("2", error);
    return { success: false, error };
  }
};
