"use server";

import {
  UnpopulatedUser,
  UnpopulatedUserZodSchema,
  UserLoginZodSchema,
  UserZodSchema,
} from "@/schemas/mongodb/user";
import { Db, ObjectId } from "mongodb";

import init from ".";

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

    return parsedUser.data;
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

    return parsedUser.data;
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
