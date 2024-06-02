import { z } from "zod";

import init from ".";

const LinkZodSchema = z.object({
  label: z.string(),
  url: z.string(),
});
export type Link = z.infer<typeof LinkZodSchema>;

const SectionZodSchema = z.object({
  title: z.string(),
  link: LinkZodSchema,
});
type Section = z.infer<typeof SectionZodSchema>;

const BlackboardchannelZodSchema = z.object({
  title: z.string(),
  body: z.string(),
  news: z.array(SectionZodSchema),
  generals: z.array(SectionZodSchema),
});
export type Blackboardchannel = z.infer<typeof BlackboardchannelZodSchema>;

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
