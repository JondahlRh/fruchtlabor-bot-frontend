import { getRoute } from "@/lib/backendApi";
import { z } from "zod";

import WebCard from "../components/WebCard";

export const TsDescriptionZodSchema = z.object({
  _id: z.string(),
  text: z.string(),
});

export default async () => {
  const data = await getRoute(
    "admin/teamspeak/tsdescription",
    z.array(TsDescriptionZodSchema)
  );
  if (!data) return <div>empty</div>;

  return (
    <>
      <h2 className="mb-4 text-3xl font-black">Teamspeak Servergruppen</h2>
      <div className="flex flex-wrap gap-4">
        {data.map((description, index) => (
          <WebCard
            key={description._id}
            _id={description._id}
            name={`Beschreibung Nummer ${index + 1}`}
          >
            {description.text.split("\n").map((x) => (
              <p>{x}</p>
            ))}
          </WebCard>
        ))}
      </div>
    </>
  );
};
