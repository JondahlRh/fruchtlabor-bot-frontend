import { ObjectId } from "mongodb";
import { z } from "zod";

const PermissionZodSchema = z.object({
  name: z.string(),
});
const RoleZodSchema = z.object({
  name: z.string(),
  permissions: z.array(PermissionZodSchema),
});
export const UserZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  username: z.string(),
  isOwner: z.boolean(),
  permissions: z.array(PermissionZodSchema),
  roles: z.array(RoleZodSchema),
});
export type User = z.infer<typeof UserZodSchema>;

export const UnpopulatedUserZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  username: z.string(),
  apikey: z.string(),
  isOwner: z.boolean(),
  roles: z.array(z.instanceof(ObjectId)),
  permissions: z.array(z.instanceof(ObjectId)),
});
export type UnpopulatedUser = z.infer<typeof UnpopulatedUserZodSchema>;

export const UserLoginZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  username: z.string(),
  apikey: z.string(),
});
