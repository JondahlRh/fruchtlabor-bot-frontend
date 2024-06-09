"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

export default function Page() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return router.replace("/");

  return (
    <div className="">
      <h1 className="mb-4 text-4xl font-bold">Beschreibungen</h1>
    </div>
  );
}
