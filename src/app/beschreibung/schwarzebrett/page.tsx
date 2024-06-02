import init from "@/services/mongoDbService";
import { z } from "zod";

import BlackboardchannelForm from "./components/BlackboardchannelForm";

const LinkZodSchema = z.object({
  label: z.string(),
  url: z.string(),
});
export type Link = z.infer<typeof LinkZodSchema>;

const SectionZodSchema = z.object({
  title: z.string(),
  link: LinkZodSchema,
});

const BlackboardchannelZodSchema = z.object({
  title: z.string(),
  body: z.string(),
  news: z.array(SectionZodSchema),
  generals: z.array(SectionZodSchema),
});
export type Blackboardchannel = z.infer<typeof BlackboardchannelZodSchema>;

const getData = async () => {
  const db = await init();
  const data = await db.collection("blackboardchannels").findOne();
  return BlackboardchannelZodSchema.safeParse(data);
};

const updateData = async (data: Blackboardchannel) => {
  "use server";

  const db = await init();
  await db.collection("blackboardchannels").updateOne({}, { $set: data });
};

const mapData = (data: Blackboardchannel) => {
  return {
    title: data.title,
    body: data.body,
    news: data.news.map((section, index) => ({
      id: Date.now() + index,
      title: section.title,
      link: section.link,
    })),
    generals: data.generals.map((section, index) => ({
      id: Date.now() + index,
      title: section.title,
      link: section.link,
    })),
  };
};

export default async function Page() {
  const refetchData = async () => {
    "use server";

    const newData = await getData();
    if (!newData.success) throw newData.error;
    return mapData(newData.data);
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">Schwarze Brett</h1>

      <BlackboardchannelForm getData={refetchData} updateData={updateData} />
    </div>
  );
}
