import SimplePage from "@/app/components/SimplePage";
import { z } from "zod";

import { getRoute } from "../../../lib/backendApi";
import { PermissionZodSchema } from "../permission/page";

export const RoleZodSchema = z.object({
  _id: z.string(),
  name: z.string(),
  permissions: z.array(PermissionZodSchema),
});

export default async () => {
  const data = await getRoute("admin/auth/role", z.array(RoleZodSchema));
  if (!data) return <div>empty</div>;

  return (
    <SimplePage title="Roles" data={data} rows={3}>
      {(item) => (
        <>
          <h3>{item.name}</h3>
        </>
      )}
    </SimplePage>
  );
};
