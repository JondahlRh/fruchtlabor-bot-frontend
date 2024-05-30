import { getRoute } from "@/lib/backendApi";
import { z } from "zod";

import WebCard from "../components/WebCard";

export const TsChannelgroupZodSchema = z.object({
  _id: z.string(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export default async () => {
  const data = await getRoute(
    "admin/teamspeak/tschannelgroup",
    z.array(TsChannelgroupZodSchema)
  );
  if (!data) return <div>empty</div>;

  return (
    <>
      <h2 className="mb-4 text-3xl font-black">Teamspeak Channelgruppen</h2>
      <div className="flex flex-wrap gap-4">
        {data.map((channel) => (
          <WebCard
            key={channel._id}
            _id={channel._id}
            name={channel.name}
            id={{ key: "Channel", value: channel.id }}
          >
            {channel.description}
          </WebCard>
        ))}
      </div>
    </>
  );
};
