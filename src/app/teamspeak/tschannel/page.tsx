import { getRoute } from "@/lib/backendApi";
import { z } from "zod";

import WebCard from "../components/WebCard";

export const TsChannelZodSchema = z.object({
  _id: z.string(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  isBotChannel: z.boolean(),
});

export type TsChannelType = z.infer<typeof TsChannelZodSchema>;

export default async () => {
  const data = await getRoute(
    "admin/teamspeak/tschannel",
    z.array(TsChannelZodSchema)
  );
  if (!data) return <div>empty</div>;

  return (
    <>
      <h2 className="mb-4 text-3xl font-black">Teamspeak Channels</h2>
      <div className="flex flex-wrap gap-4">
        {data.map((channel) => (
          <WebCard
            key={channel._id}
            _id={channel._id}
            name={channel.name}
            id={{ key: "Channel", value: channel.id }}
            chips={[{ visible: channel.isBotChannel, title: "Bot Channel" }]}
          >
            {channel.description}
          </WebCard>
        ))}
      </div>
    </>
  );
};
