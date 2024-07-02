"use server";

import {
  InfoDescription,
  InfoDescriptionWithId,
  InfoDescriptionZodSchema,
  UnpopulatedInfoDescription,
  UnpopulatedInfoDescriptionZodSchema,
} from "@/schemas/mongodb/infodescription";
import { Db, ObjectId } from "mongodb";
import { z } from "zod";

import init from ".";
import nanoid from "../nano";
import { checkAuth } from "./user";

const mapInfoDescription = (infoDescription: InfoDescription) => {
  return {
    _id: infoDescription._id.toString(),
    name: infoDescription.name,
    channel: {
      ...infoDescription.channel,
      _id: infoDescription.channel._id.toString(),
    },
    title: infoDescription.title,
    subtitle: infoDescription.subtitle,
    description: infoDescription.description,
    entrySections: infoDescription.entrySections.map((entrySection) => ({
      id: nanoid(),
      entries: entrySection.map((entry) => ({
        id: nanoid(),
        type: entry.type,
        title: entry.title,
        subtitle: entry.subtitle,
        links: entry.links.map((link) => ({
          id: nanoid(),
          label: link.label,
          url: link.url,
        })),
      })),
    })),
  };
};

const populateInfoDescriptions = async (
  db: Db,
  infoDescription: UnpopulatedInfoDescription
) => {
  const channel = await db
    .collection("tschannels")
    .findOne({ _id: infoDescription.channel });

  return { channel };
};

export const findArrayOfInfoDescriptions = async (token: string) => {
  const hasPermission = await checkAuth(token, "exec_infodescriptions");
  if (!hasPermission) return null;

  try {
    const db = await init();
    const rawData = await db.collection("infodescriptions").find().toArray();

    for (const rawSingleData of rawData) {
      const parsedRawData =
        UnpopulatedInfoDescriptionZodSchema.safeParse(rawSingleData);
      if (!parsedRawData.success) throw new Error("Invalid data");

      const { channel } = await populateInfoDescriptions(
        db,
        parsedRawData.data
      );

      rawSingleData.channel = channel;
    }

    const parsedInfoDescriptions = z
      .array(InfoDescriptionZodSchema)
      .safeParse(rawData);

    if (!parsedInfoDescriptions.success) throw new Error("Invalid data!!");

    return parsedInfoDescriptions.data.map(mapInfoDescription);
  } catch (error) {
    return null;
  }
};

export const saveInfoDescription = async (
  infodescription: InfoDescriptionWithId
) => {
  const entrySections = infodescription.entrySections.map((outerEntry) =>
    outerEntry.entries.map((innerEntry) => ({
      title: innerEntry.title,
      subtitle: innerEntry.subtitle,
      type: innerEntry.type,
      links: innerEntry.links.map((link) => ({
        label: link.label,
        url: link.url,
      })),
    }))
  );

  const data = {
    name: infodescription.name,
    channel: new ObjectId(infodescription.channel._id),
    title: infodescription.title,
    subtitle: infodescription.subtitle,
    description: infodescription.description,
    entrySections,
  };

  try {
    const db = await init();
    await db
      .collection("infodescriptions")
      .findOneAndReplace({ _id: new ObjectId(infodescription._id) }, data);
  } catch (error) {
    return null;
  }
};
