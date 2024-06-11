"use client";

import { useContext, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import AuthContext from "../context/auth";
import { authenticate } from "../lib/actions";

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  );
}

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { updateUser } = useContext(AuthContext);

  const submitHandler = async (_currentState: unknown, formData: FormData) => {
    const result = await authenticate(null, formData);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    localStorage.setItem("authToken", result.token);
    setErrorMessage(null);
    updateUser(result.user);
  };

  const [, dispatch] = useFormState(submitHandler, undefined);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Benutzername</label>
        <input type="text" id="username" name="username" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Passwort</label>
        <input type="password" id="password" name="apikey" />
      </div>

      <div>{errorMessage && <p>{errorMessage}</p>}</div>

      <LoginButton />
    </form>
  );
}
