"use client";

import type { Blackboardchannel, Link } from "@/schemas/mongodb";
import { useCallback, useState } from "react";

import Textarea from "../../components/Textarea";
import SectionArea from "./SectionArea";

export type SectionWithID = {
  id: number;
  title: string;
  link: Link;
};

export type BlackboardchannelState = {
  title: string;
  body: string;
  news: SectionWithID[];
  generals: SectionWithID[];
};

const getEmptySection = () => ({
  id: Date.now(),
  title: "",
  link: { label: "", url: "" },
});

const addSection = (
  prev: BlackboardchannelState,
  field: "news" | "generals"
) => {
  const sections = [...prev[field], getEmptySection()];
  return { ...prev, [field]: sections };
};
const updateSection = (
  prev: BlackboardchannelState,
  field: "news" | "generals",
  newSection: SectionWithID,
  id: number
) => {
  const sections = prev[field].map((s) => (id === s.id ? newSection : s));
  return { ...prev, [field]: sections };
};
const removeSection = (
  prev: BlackboardchannelState,
  field: "news" | "generals",
  id: number
) => {
  const sections = prev[field].filter((s) => s.id !== id);
  return { ...prev, [field]: sections };
};

type Props = {
  data: BlackboardchannelState;
  getData: () => Promise<BlackboardchannelState>;
  updateData: (data: Blackboardchannel) => Promise<{ success: boolean }>;
};

export default function Form(props: Props) {
  const [blackboardchannel, setBlackboardchannel] =
    useState<BlackboardchannelState>(props.data);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlackboardchannel((prev) => ({ ...prev, title: e.target.value }));
  };
  const bodyChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlackboardchannel((prev) => ({ ...prev, body: e.target.value }));
  };

  const addNewsSection = () => {
    setBlackboardchannel((prev) => addSection(prev, "news"));
  };
  const updateNewsSection = useCallback(
    (id: number, newSection: SectionWithID) => {
      setBlackboardchannel((prev) =>
        updateSection(prev, "news", newSection, id)
      );
    },
    []
  );
  const removeNewsSection = (id: number) => {
    setBlackboardchannel((prev) => removeSection(prev, "news", id));
  };

  const addGeneralsSection = () => {
    setBlackboardchannel((prev) => addSection(prev, "generals"));
  };
  const updateGeneralsSection = useCallback(
    (id: number, newSection: SectionWithID) => {
      setBlackboardchannel((prev) =>
        updateSection(prev, "generals", newSection, id)
      );
    },
    []
  );
  const removeGeneralsSection = (id: number) => {
    setBlackboardchannel((prev) => removeSection(prev, "generals", id));
  };

  if (!blackboardchannel) return <div>Loading...</div>;

  const cancelHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = await props.getData();
    setBlackboardchannel(data);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await props.updateData(blackboardchannel);

    const newData = await props.getData();
    setBlackboardchannel(newData);
  };
  const execHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const apikey = localStorage.getItem("apikey") ?? "";

    await fetch("blackboardchannel/api", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apikey}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-4"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col gap-1">
        <label>Titel</label>
        <Textarea
          placeholder="Titel"
          rows={3}
          value={blackboardchannel.title}
          onChange={titleChangeHandler}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Beschreibung</label>
        <Textarea
          placeholder="Beschreibung"
          rows={3}
          value={blackboardchannel.body}
          onChange={bodyChangeHandler}
        />
      </div>

      <SectionArea
        title="News"
        addTitle="Neue News hinzufügen"
        sections={blackboardchannel.news}
        addSection={addNewsSection}
        updateSection={updateNewsSection}
        removeSection={removeNewsSection}
      />

      <SectionArea
        title="Allgemeine Informationen"
        addTitle="Neue allgemeine Information hinzufügen"
        sections={blackboardchannel.generals}
        addSection={addGeneralsSection}
        updateSection={updateGeneralsSection}
        removeSection={removeGeneralsSection}
      />

      <div className="flex justify-center gap-4">
        <button
          className="min-w-48 rounded-lg bg-tertiary py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={cancelHandler}
        >
          Zurücksetzen
        </button>
        <button className="min-w-48 rounded-lg bg-primary py-1 font-bold text-neutral-900 hover:bg-opacity-75">
          Speichern
        </button>
        <button
          className="min-w-48 rounded-lg bg-quadro py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={execHandler}
        >
          Teamspeak anpasen
        </button>
      </div>
    </form>
  );
}
