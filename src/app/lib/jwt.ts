"use server";

import jwt from "jsonwebtoken";
import { z } from "zod";

export async function createToken(userid: string) {
  return jwt.sign(userid, process.env.JWT_SECRET ?? "");
}

export async function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "");
    return z.string().parse(payload);
  } catch (error) {
    return null;
  }
}
