"use server";

import {
  InfoDescription,
  InfoDescriptionZodSchema,
  UnpopulatedInfoDescription,
  UnpopulatedInfoDescriptionZodSchema,
} from "@/schemas/mongodb/infodescription";
import { Db } from "mongodb";
import { z } from "zod";

import init from ".";
import nanoid from "../nano";
import { checkAuth } from "./user";

const mapInfoDescriptions = (infoDescriptions: InfoDescription[]) => {
  return infoDescriptions.map((infoDescription) => ({
    _id: infoDescription._id.toString(),
    name: infoDescription.name,
    channel: infoDescription.channel,
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
  }));
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
    if (!parsedInfoDescriptions.success) throw new Error("Invalid data");

    return mapInfoDescriptions(parsedInfoDescriptions.data);
  } catch (error) {
    return null;
  }
};
