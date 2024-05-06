import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={className}>{children}</body>
    </html>
  );
};
