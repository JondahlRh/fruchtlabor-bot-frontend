import { ObjectId } from "mongodb";
import { z } from "zod";

import init from ".";
import { findOneUserById } from "./user";

const TokenDataZodSchema = z.tuple([z.string(), z.string()]);

export default async function checkAuth(token: string, permission?: string) {
  "use server";

  const tokenData = TokenDataZodSchema.safeParse(token.split(":"));
  if (!tokenData.success) return null;
  const [tokenId, tokenApikey] = tokenData.data;

  try {
    const user = await findOneUserById(tokenId);
    if (!user) return null;

    if (user.isOwner) return true;
    if (!permission) return false;

    const hasPermission = user.permissions.some((x) => x.name === permission);
    if (hasPermission) return true;

    const hasRolePermission = user.roles.some((role) =>
      role.permissions.some((x) => x.name === permission)
    );
    if (hasRolePermission) return true;

    return false;
  } catch (error) {
    return null;
  }
}
