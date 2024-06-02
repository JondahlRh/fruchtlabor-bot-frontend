import {
  Blackboardchannel,
  BlackboardchannelZodSchema,
  Section,
} from "@/schemas/mongodb";

import init from ".";

const addIdField = (sections: Section[]) => {
  return sections.map((section, index) => ({
    ...section,
    id: Date.now() + index,
  }));
};

export const mapBlackboardchannel = (data: Blackboardchannel) => {
  return {
    title: data.title,
    body: data.body,
    news: addIdField(data.news),
    generals: addIdField(data.generals),
  };
};

export const findOneBlackboardchannels = async () => {
  "use server";

  try {
    const db = await init();
    const data = await db.collection("blackboardchannels").findOne();
    return BlackboardchannelZodSchema.safeParse(data);
  } catch (error) {
    return null;
  }
};

export const updateOneBlackboardchannels = async (data: Blackboardchannel) => {
  "use server";

  try {
    const mappedData = BlackboardchannelZodSchema.parse(data);

    const db = await init();
    await db
      .collection("blackboardchannels")
      .updateOne({}, { $set: mappedData });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
