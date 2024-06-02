import { ObjectId } from "mongodb";
import { z } from "zod";

import init from ".";

const PermissionZodSchema = z.object({
  name: z.string(),
});
const RoleZodSchema = z.object({
  name: z.string(),
  permissions: z.array(PermissionZodSchema),
});
const UserZodSchema = z.object({
  username: z.string(),
  apikey: z.string(),
  isOwner: z.boolean(),
  permissions: z.array(PermissionZodSchema),
  roles: z.array(RoleZodSchema),
});

export const findOneUserById = async (userid: string) => {
  "use server";

  try {
    const db = await init();

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userid) });
    if (!user) throw new Error("User not found");

    const roles = await db
      .collection("roles")
      .find({ _id: { $in: user.roles.map((id: string) => new ObjectId(id)) } })
      .toArray();

    for (const role of roles) {
      const permissions = await db
        .collection("permissions")
        .find({
          _id: { $in: role.permissions.map((id: string) => new ObjectId(id)) },
        })
        .toArray();
      role.permissions = permissions;
    }

    const userPermissions = await db
      .collection("permissions")
      .find({
        _id: { $in: user.permissions.map((id: string) => new ObjectId(id)) },
      })
      .toArray();
    user.permissions = userPermissions;
    user.roles = roles;

    const parsedUser = UserZodSchema.safeParse(user);
    if (!parsedUser.success) throw new Error("Invalid user");

    return parsedUser.data;
  } catch (error) {
    return null;
  }
};
