"use client";

import { User } from "@/services/mongoDbService/user";
import { useEffect, useState } from "react";

import { verifyToken } from "../lib/jwt";

export function useAuth() {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  console.log("useauth");
  if (typeof localStorage !== undefined) {
    console.log(localStorage, typeof localStorage);
    console.log("useauth", localStorage.getItem("authToken"));
  }

  useEffect(() => {
    const setUserFromToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = await verifyToken(token);
        if (!decodedToken) throw "invalid token";

        setUser(decodedToken);
      } catch (error) {
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    setUserFromToken();
  }, []);

  return { user, loading };
}
