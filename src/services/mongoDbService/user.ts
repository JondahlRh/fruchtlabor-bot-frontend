import { Db, ObjectId } from "mongodb";
import { z } from "zod";

import init from ".";

const PermissionZodSchema = z.object({
  name: z.string(),
});
const RoleZodSchema = z.object({
  name: z.string(),
  permissions: z.array(PermissionZodSchema),
});
export const UserZodSchema = z.object({
  username: z.string(),
  apikey: z.string(),
  isOwner: z.boolean(),
  permissions: z.array(PermissionZodSchema),
  roles: z.array(RoleZodSchema),
});
export type User = z.infer<typeof UserZodSchema>;

const UnpopulatedUserZodSchema = z.object({
  username: z.string(),
  apikey: z.string(),
  isOwner: z.boolean(),
  roles: z.array(z.instanceof(ObjectId)),
  permissions: z.array(z.instanceof(ObjectId)),
});
type UnpopulatedUser = z.infer<typeof UnpopulatedUserZodSchema>;

const populatePermissionsAndRoles = async (db: Db, user: UnpopulatedUser) => {
  const roles = await db
    .collection("roles")
    .find({ _id: { $in: user.roles } })
    .toArray();

  for (const role of roles) {
    const permissions = await db
      .collection("permissions")
      .find({ _id: { $in: role.permissions } })
      .toArray();
    role.permissions = permissions;
  }

  const permissions = await db
    .collection("permissions")
    .find({ _id: { $in: user.permissions } })
    .toArray();

  return { permissions, roles };
};

export const findOneUserById = async (userid: string) => {
  "use server";

  try {
    const db = await init();

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userid) });
    if (!user) throw new Error("User not found");

    const unpopulatedUser = UnpopulatedUserZodSchema.safeParse(user);
    if (!unpopulatedUser.success) throw new Error("Invalid user");

    const { permissions, roles } = await populatePermissionsAndRoles(
      db,
      unpopulatedUser.data
    );

    user.permissions = permissions;
    user.roles = roles;

    const parsedUser = UserZodSchema.safeParse(user);
    if (!parsedUser.success) throw new Error("Invalid user");

    return parsedUser.data;
  } catch (error) {
    return null;
  }
};

export const findOneUserByUsername = async (username: string) => {
  "use server";

  try {
    const db = await init();

    const user = await db.collection("users").findOne({ username });
    if (!user) throw new Error("User not found");

    const unpopulatedUser = UnpopulatedUserZodSchema.safeParse(user);
    if (!unpopulatedUser.success) throw new Error("Invalid user");

    const { permissions, roles } = await populatePermissionsAndRoles(
      db,
      unpopulatedUser.data
    );

    user.permissions = permissions;
    user.roles = roles;

    const parsedUser = UserZodSchema.safeParse(user);
    if (!parsedUser.success) throw new Error("Invalid user");

    return parsedUser.data;
  } catch (error) {
    return null;
  }
};
