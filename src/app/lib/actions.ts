"use server";

import { findOneUserByUsername } from "@/services/mongoDbService/user";
import bcrypt from "bcrypt";

import { createToken } from "./jwt";

export async function authenticate(_currentState: unknown, formData: FormData) {
  const username = formData.get("username")?.toString();
  const apikey = formData.get("apikey")?.toString();
  if (!username || !apikey)
    return {
      success: false as const,
      error: "Bitte Benutzername und Passwort eingeben",
    };

  try {
    const user = await findOneUserByUsername(username);
    if (!user) throw "user does not exist";

    const isPasswordValid = await bcrypt.compare(apikey, user.apikey);
    if (!isPasswordValid) throw "invalid password";

    const token = await createToken(user);

    return { success: true as const, token };
  } catch (error) {
    if (error) {
      return { success: false as const, error: "Login fehlgeschlagen" };
    }
    throw error;
  }
}
