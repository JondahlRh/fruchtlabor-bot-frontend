"use client";

import { User } from "@/schemas/mongodb/user";
import { findOneUserById } from "@/services/mongoDbService/user";
import { createContext, useEffect, useState } from "react";

import { verifyToken } from "../lib/jwt";

const defaultContextValues = {
  loading: true,
  user: null,
  updateUser: () => {},
};

type AuthContextType = {
  loading: boolean;
  user: User | null;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>(defaultContextValues);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setUserFromToken = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw "no token";

        const decodedToken = await verifyToken(token);
        if (!decodedToken) throw "invalid token";

        const user = await findOneUserById(decodedToken);
        if (!user) throw "user does not exist";

        setUser(user);
      } catch (error) {
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    setUserFromToken();
  }, []);

  const updateUser = (user: User) => {
    setUser(user);
  };

  console.log(loading, user);

  return (
    <AuthContext.Provider value={{ loading, user, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
