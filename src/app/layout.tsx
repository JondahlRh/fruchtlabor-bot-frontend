import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navigation from "./components/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FruchtLabor Bot",
  description:
    "Frontend for the teamspeak bot for the fruchtlabor cs community",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default ({ children }: Props) => {
  const className = clsx(inter.className, "bg-neutral-900 text-neutral-300");

  return (
    <html lang="en">
      <body className={className}>
        <Navigation />
        <main className="mx-auto max-w-screen-xl p-4">{children}</main>
      </body>
    </html>
  );
};
