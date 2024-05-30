import { getRoute } from "@/lib/backendApi";
import { z } from "zod";

import WebCard from "../components/WebCard";

export const TsServergroupZodSchema = z.object({
  _id: z.string(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  isTeammember: z.boolean(),
});

export type TsServergroupType = z.infer<typeof TsServergroupZodSchema>;

export default async () => {
  const data = await getRoute(
    "admin/teamspeak/tsservergroup",
    z.array(TsServergroupZodSchema)
  );
  if (!data) return <div>empty</div>;

  return (
    <>
      <h2 className="mb-4 text-3xl font-black">Teamspeak Servergruppen</h2>
      <div className="flex flex-wrap gap-4">
        {data.map((servergroup) => (
          <WebCard
            key={servergroup._id}
            _id={servergroup._id}
            name={servergroup.name}
            id={{ key: "Servergruppen", value: servergroup.id }}
            chips={[
              { visible: servergroup.isTeammember, title: "Teammitglied" },
            ]}
          >
            {servergroup.description}
          </WebCard>
        ))}
      </div>
    </>
  );
};
