import SimplePage from "@/app/components/SimplePage";
import { z } from "zod";

import { getRoute } from "../../../lib/backendApi";

export const PermissionZodSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export default async () => {
  const data = await getRoute(
    "admin/auth/permission",
    z.array(PermissionZodSchema)
  );
  if (!data) return <div>empty</div>;

  return (
    <SimplePage title="Permissions" data={data} rows={3}>
      {(item) => (
        <>
          <h3>{item.name}</h3>
        </>
      )}
    </SimplePage>
  );
};
