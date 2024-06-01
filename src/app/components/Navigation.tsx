import Link from "next/link";

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
  return (
    <nav className="bg-neutral-600">
      <ul className="flex justify-center">
        <LinkItem href="/" title="Home" />
        <LinkItem
          href="/beschreibung/oragnisatorisches"
          title="Oragnisatorisches"
        />
        <LinkItem href="/beschreibung/schwarzebrett" title="Schwarze Brett" />
        <LinkItem href="/beschreibung/teamchannels" title="Team Channels" />
      </ul>
    </nav>
  );
}
