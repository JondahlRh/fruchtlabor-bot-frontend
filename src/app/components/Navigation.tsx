"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

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
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <nav className="bg-neutral-600">
      <ul className="flex justify-center">
        <LinkItem href="/" title="Home" />

        {!loading && user && (
          <LinkItem href="/beschreibungen" title="Beschreibungen" />
        )}
        {!loading && user && (
          <LinkItem href="/beschreibungen" title="Beschreibungen" />
        )}
      </ul>
    </nav>
  );
}
