"use server";

import { verifyToken } from "@/app/lib/jwt";
import {
  UnpopulatedUser,
  UnpopulatedUserZodSchema,
  User,
  UserLoginZodSchema,
  UserWithId,
  UserZodSchema,
} from "@/schemas/mongodb/user";
import { Db, ObjectId } from "mongodb";

import init from ".";

const mapUser = (user: User): UserWithId => {
  return {
    ...user,
    _id: user._id.toString(),
  };
};

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

    return mapUser(parsedUser.data);
  } catch (error) {
    return null;
  }
};

export const findOneUserByUsername = async (username: string) => {
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

    return mapUser(parsedUser.data);
  } catch (error) {
    return null;
  }
};

export const findOneLoginUserByUsername = async (username: string) => {
  try {
    const db = await init();

    const user = await db.collection("users").findOne({ username });
    if (!user) throw new Error("User not found");

    const parsedLoginUser = UserLoginZodSchema.safeParse(user);
    if (!parsedLoginUser.success) throw new Error("Invalid user");

    return parsedLoginUser.data;
  } catch (error) {
    return null;
  }
};

export const checkAuth = async (token: string, permission: string) => {
  try {
    const tokenData = await verifyToken(token);
    if (!tokenData) throw new Error("Invalid token");

    const user = await findOneUserById(tokenData);
    if (!user) throw new Error("User not found");

    const hasDirectPermission = user.permissions.some(
      (p) => p.name === permission
    );
    const hasRolePermission = user.roles.some((r) =>
      r.permissions.some((p) => p.name === permission)
    );

    return user.isOwner || hasDirectPermission || hasRolePermission;
  } catch (error) {
    return false;
  }
};
