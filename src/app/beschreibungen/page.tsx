"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";

import AuthContext from "../context/auth";

export default function Page() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  if (!user) return router.replace("/");

  return (
    <div className="">
      <h1 className="mb-4 text-4xl font-bold">Beschreibungen</h1>
    </div>
  );
}
