"use client";

import { useContext } from "react";

import LoginForm from "./components/LoginForm";
import AuthContext from "./context/auth";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">FruchtLabor Bot Frontend</h1>

      {!user && <LoginForm />}
    </div>
  );
}
