import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navigation from "./components/Navigation";
import { AuthContextProvider } from "./context/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FruchtLabor TeamSpeak Bot Frontend",
  description: "Frontend for the FruchtLabor TeamSpeak Bot to manage the bot",
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function AppLayout(props: Props) {
  const classes = clsx(inter.className, "bg-neutral-900 text-neutral-300");

  return (
    <html lang="de">
      <body className={classes}>
        <AuthContextProvider>
          <Navigation />
          <main className="mx-auto max-w-screen-xl p-4">{props.children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
