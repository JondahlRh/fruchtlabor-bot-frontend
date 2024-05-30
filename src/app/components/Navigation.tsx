"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaAlignJustify, FaAngleDown, FaAngleUp, FaX } from "react-icons/fa6";

type NavigationItemProps = {
  title: string;
  path: string;
};
const SubnavNavigationItem = (props: NavigationItemProps) => {
  return (
    <li className="border-b border-neutral-300 border-opacity-30 md:w-48">
      <Link
        href={props.path.toLowerCase()}
        className="flex w-full px-2 py-2 hover:bg-primary hover:text-neutral-800"
      >
        <span className="pl-4 md:w-full md:px-4 md:text-center">
          {props.title}
        </span>
      </Link>
    </li>
  );
};
const SimpleNavigationItem = (props: NavigationItemProps) => {
  return (
    <li className="border-b border-neutral-300 border-opacity-30 md:h-full md:w-48 md:border-0">
      <Link
        href={props.path.toLowerCase()}
        className="flex w-full px-2 py-2 hover:bg-primary hover:text-neutral-800 md:h-full md:items-center"
      >
        <span className="md:w-full md:text-center">{props.title}</span>
      </Link>
    </li>
  );
};

type ExtendedNavigationItemProps = {
  title: string;
  navChildren: NavigationItemProps[];
};
const ExtendedNavigationItem = (props: ExtendedNavigationItemProps) => {
  const [subnavIsOpen, setSubnavIsOpen] = useState(false);

  const subnavClickHandler = () => {
    setSubnavIsOpen((p) => !p);
  };

  return (
    <li className="md:relative md:h-full">
      <button
        className="flex w-full px-2 py-2 hover:bg-primary hover:text-neutral-800 md:h-full md:w-48 md:items-center"
        onClick={subnavClickHandler}
      >
        <span className="md:w-full md:text-center">{props.title}</span>
        {props.navChildren && props.navChildren.length > 0 && (
          <div className="ml-auto self-center">
            {subnavIsOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        )}
      </button>

      <div
        className={clsx(
          "grid overflow-hidden border-t border-neutral-300 border-opacity-30 transition-[grid-template-rows] duration-1000 md:absolute md:border-0 md:bg-neutral-800",
          {
            "grid-rows-[1fr]": subnavIsOpen,
            "grid-rows-[0fr]": !subnavIsOpen,
          }
        )}
      >
        <ul className="min-h-0">
          {props.navChildren.map((navitem) => (
            <SubnavNavigationItem
              key={navitem.title}
              title={navitem.title}
              path={navitem.path}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  const openMobileNavClickHandler = () => {
    setMobileNavIsOpen(true);
  };
  const closeMobileNavClickHandler = () => {
    setMobileNavIsOpen(false);
  };

  return (
    <nav>
      <header className="flex bg-neutral-800">
        <button
          className="ml-auto p-4 md:hidden"
          onClick={openMobileNavClickHandler}
        >
          <FaAlignJustify size={18} />
        </button>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-10 max-w-64 bg-neutral-800 transition-[left] duration-300 md:static md:inset-auto md:flex md:w-full md:max-w-full md:px-8",
          {
            "-left-72": !mobileNavIsOpen,
          }
        )}
      >
        <div className="relative mx-auto md:flex md:max-w-screen-xl md:gap-8">
          <div className="flex flex-col items-center gap-4 pb-4 pt-8 md:flex-row md:py-4">
            <Image
              src="/logo.svg"
              height={96}
              width={96}
              alt="FruchtLabor"
              className="opacity-90 md:w-12"
            />
            <h1 className="text-nowrap text-2xl font-bold">FruchtLabor Bot</h1>
          </div>

          <button
            className="absolute -right-6 top-6 flex aspect-square w-12 items-center justify-center rounded-full bg-red-600 md:hidden"
            onClick={closeMobileNavClickHandler}
          >
            <FaX size={18} />
          </button>

          <ul className="w-full md:flex md:w-auto md:items-center">
            <SimpleNavigationItem title="Home" path="/" />
            <ExtendedNavigationItem
              title="Auth"
              navChildren={[
                { title: "User", path: "/Auth/User" },
                { title: "Role", path: "/Auth/Role" },
                { title: "Permission", path: "/Auth/Permission" },
              ]}
            />
            <ExtendedNavigationItem
              title="Functions"
              navChildren={[
                {
                  title: "AddgroupChannel",
                  path: "/Functions/AddgroupChannel",
                },
                { title: "AfkChannel", path: "/Functions/AfkChannel" },
                { title: "CustomChannel", path: "/Functions/CustomChannel" },
                { title: "JoinMessage", path: "/Functions/JoinMessage" },
                { title: "LobbyChannel", path: "/Functions/LobbyChannel" },
                { title: "ServerOverview", path: "/Functions/ServerOverview" },
                {
                  title: "ServerPlayercount",
                  path: "/Functions/ServerPlayercount",
                },
                { title: "SupportMessage", path: "/Functions/SupportMessage" },
              ]}
            />
            <ExtendedNavigationItem
              title="General"
              navChildren={[
                { title: "ActivityEntry", path: "/General/ActivityEntry" },
                { title: "AsyncError", path: "/General/AsyncError" },
                { title: "CsServer", path: "/General/CsServer" },
                { title: "Fruit", path: "/General/Fruit" },
                { title: "SupportLog", path: "/General/SupportLog" },
              ]}
            />
            <ExtendedNavigationItem
              title="Teamspeak"
              navChildren={[
                { title: "TsChannel", path: "/Teamspeak/TsChannel" },
                { title: "TsChannelgroup", path: "/Teamspeak/TsChannelgroup" },
                { title: "TsCollection", path: "/Teamspeak/TsCollection" },
                { title: "TsDescription", path: "/Teamspeak/TsDescription" },
                { title: "TsServergroup", path: "/Teamspeak/TsServergroup" },
              ]}
            />
          </ul>
        </div>
      </div>

      {mobileNavIsOpen && (
        <div
          className="absolute inset-0 bg-black opacity-40"
          onClick={closeMobileNavClickHandler}
        />
      )}
    </nav>
  );
};
