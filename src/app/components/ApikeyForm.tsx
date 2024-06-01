"use client";

import { useEffect, useState } from "react";

export default function ApikeyForm() {
  const localApikey = localStorage.getItem("apikey") ?? "";
  const [apiKey, setApiKey] = useState(localApikey);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("apikey", apiKey);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiKey]);

  return (
    <form className="flex flex-col gap-2 rounded-md border border-gray-200 p-4">
      <label htmlFor="api-key">Eingabe API Key</label>
      <input
        type="password"
        placeholder="API Key"
        id="api-key"
        className="w-96 rounded-md p-1 text-neutral-500"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
    </form>
  );
}
