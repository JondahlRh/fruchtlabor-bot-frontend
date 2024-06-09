"use server";

import { User, UserZodSchema } from "@/services/mongoDbService/user";
import jwt from "jsonwebtoken";

export async function createToken(user: User) {
  return jwt.sign(user, process.env.JWT_SECRET ?? "", { expiresIn: "8 days" });
}

export async function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "");
    console.log("payload", payload);

    return UserZodSchema.parse(payload);
  } catch (error) {
    return null;
  }
}
