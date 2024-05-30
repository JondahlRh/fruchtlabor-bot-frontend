import SimplePage from "@/app/components/SimplePage";
import { z } from "zod";

import { getRoute } from "../../../lib/backendApi";
import { PermissionZodSchema } from "../permission/page";
import { RoleZodSchema } from "../role/page";

export const UserZodSchema = z.object({
  _id: z.string(),
  username: z.string(),
  apikey: z.string(),
  isOwner: z.boolean(),
  roles: z.array(RoleZodSchema),
  permissions: z.array(PermissionZodSchema),
});

export default async () => {
  const data = await getRoute("admin/auth/user", z.array(UserZodSchema));
  if (!data) return <div>empty</div>;

  return (
    <SimplePage title="Users" data={data} rows={3}>
      {(item) => (
        <>
          <h3>{item.username}</h3>
        </>
      )}
    </SimplePage>
  );
};
