"use client";

import clsx from "clsx";
import { useState } from "react";

import DbidCopyText from "../../components/DbidCopyText";
import { TsChannelType } from "../../tschannel/page";
import { TsServergroupType } from "../../tsservergroup/page";

type ListProps = {
  title: string;
  data: { _id: string; name: string }[];
};
const List = (props: ListProps) => {
  const [accordionIsOpen, setAccordionIsOpne] = useState(false);

  return (
    <div
      className={clsx("rounded-xl bg-primary text-neutral-900", {
        "bg-opacity-50": props.data.length === 0,
      })}
    >
      <button
        disabled={props.data.length === 0}
        className="w-full px-4 py-2 text-left font-black"
        onClick={() => setAccordionIsOpne((p) => !p)}
      >
        {props.title} ({props.data.length})
      </button>

      <div
        className={clsx(
          "grid overflow-hidden px-2 transition-[grid-template-rows] duration-300",
          {
            "grid-rows-[1fr] pb-2": accordionIsOpen,
            "grid-rows-[0fr]": !accordionIsOpen,
          }
        )}
      >
        <ul className="flex min-h-0 flex-col gap-2 px-1">
          {props.data.map((x) => (
            <li key={x._id}>
              <p className="font-bold">{x.name}</p>
              <DbidCopyText _id={x._id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type ContentProps = {
  label: string;
  channels: TsChannelType[];
  channelParents: TsChannelType[];
  servergroups: TsServergroupType[];
};
export default (props: ContentProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p>
        <span className="mr-1 text-neutral-400">Label:</span>
        {props.label.length === 0 ? (
          <span className="italic">None</span>
        ) : (
          props.label
        )}
      </p>

      <List title="Teamspeak Channels" data={props.channels} />
      <List title="Teamspeak Channelparents" data={props.channelParents} />
      <List title="Teamspeak Servergruppen" data={props.servergroups} />
    </div>
  );
};
