"use client";

import { useRouter } from "next/navigation";

import LoginForm from "./components/LoginForm";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">FruchtLabor Bot Frontend</h1>

      {!user && <LoginForm />}
    </div>
  );
}
