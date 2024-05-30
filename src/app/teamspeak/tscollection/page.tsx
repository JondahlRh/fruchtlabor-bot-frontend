import { getRoute } from "@/lib/backendApi";
import { z } from "zod";

import WebCard from "../components/WebCard";
import { TsChannelZodSchema } from "../tschannel/page";
import { TsServergroupZodSchema } from "../tsservergroup/page";
import Content from "./components/Content";

export const TsCollectionZodSchema = z.object({
  _id: z.string(),
  name: z.string(),
  label: z.string(),
  channels: z.array(TsChannelZodSchema),
  channelParents: z.array(TsChannelZodSchema),
  servergroups: z.array(TsServergroupZodSchema),
});

export default async () => {
  const data = await getRoute(
    "admin/teamspeak/tscollection",
    z.array(TsCollectionZodSchema)
  );
  if (!data) return <div>empty</div>;

  return (
    <>
      <h2 className="mb-4 text-3xl font-black">Teamspeak Servergruppen</h2>
      <div className="flex flex-wrap gap-4">
        {data.map((collection) => (
          <WebCard
            key={collection._id}
            _id={collection._id}
            name={collection.name}
          >
            <p>
              <span className="mr-1 text-neutral-400">Label:</span>
              {collection.label.length === 0 ? (
                <span className="italic">None</span>
              ) : (
                <span>{collection.label}</span>
              )}
            </p>
          </WebCard>
        ))}
      </div>
    </>
  );
};
