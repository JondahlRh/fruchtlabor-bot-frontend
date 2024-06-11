"use client";

import Link from "next/link";
import { useContext } from "react";

import AuthContext from "../context/auth";

type Props = {
  href: string;
  title: string;
};

function LinkItem(props: Props) {
  return (
    <li className="min-w-48 hover:bg-neutral-700">
      <Link href={props.href} className="flex justify-center p-4">
        {props.title}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const { loading, user } = useContext(AuthContext);

  return (
    <nav className="bg-neutral-600">
      <ul className="flex justify-center">
        <LinkItem href="/" title="Home" />

        {!loading && user && (
          <LinkItem href="/beschreibungen" title="Beschreibungen" />
        )}
        {!loading && user && (
          <LinkItem href="/teamchannels" title="Team Channels" />
        )}
      </ul>
    </nav>
  );
}
