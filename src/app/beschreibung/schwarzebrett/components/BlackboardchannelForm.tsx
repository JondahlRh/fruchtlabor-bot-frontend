"use client";

import { useCallback, useEffect, useState } from "react";
import { set } from "zod";

import { Blackboardchannel, Link } from "../page";
import LinkSection from "./LinkSection";
import Textarea from "./Textarea";

const getEmptySection = () => ({
  id: Date.now(),
  title: "",
  link: { label: "", url: "" },
});

const addSection = (sections: SectionWithID[]) => {
  return [...sections, getEmptySection()];
};
const updateSection = (
  sections: SectionWithID[],
  newSection: SectionWithID,
  id: number
) => {
  return sections.map((section) => (id === section.id ? newSection : section));
};
const removeSection = (sections: SectionWithID[], id: number) => {
  return [...sections.filter((section) => section.id !== id)];
};

export type SectionWithID = {
  id: number;
  title: string;
  link: Link;
};

type BlackboardchannelState = {
  title: string;
  body: string;
  news: SectionWithID[];
  generals: SectionWithID[];
};

type Props = {
  getData: () => Promise<BlackboardchannelState>;
  updateData: (data: Blackboardchannel) => Promise<void>;
};

export default function BlackboardchannelForm(props: Props) {
  console.log("BlackboardchannelForm");

  const [data, setData] = useState<BlackboardchannelState | null>(null);

  useEffect(() => {
    props.getData().then(setData);
  }, [props]);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, title: e.target.value };
    });
  };
  const bodyChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, body: e.target.value };
    });
  };

  const addNewsSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        news: addSection(prev.news),
      };
    });
  };
  const updateNewsSection = useCallback(
    (id: number, newSection: SectionWithID) => {
      setData((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          news: updateSection(prev.news, newSection, id),
        };
      });
    },
    []
  );
  const removeNewsSection = (id: number) => {
    setData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        news: removeSection(prev.news, id),
      };
    });
  };

  const addGeneralsSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        generals: addSection(prev.generals),
      };
    });
  };
  const updateGeneralsSection = useCallback(
    (id: number, newSection: SectionWithID) => {
      setData((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          generals: updateSection(prev.generals, newSection, id),
        };
      });
    },
    []
  );
  const removeGeneralsSection = (id: number) => {
    setData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        generals: removeSection(prev.generals, id),
      };
    });
  };

  if (!data) return <div>Loading...</div>;

  const cancelHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = await props.getData();
    setData(data);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await props.updateData({
      title: data.title,
      body: data.body,
      news: data.news.map((section) => ({
        title: section.title,
        link: section.link,
      })),
      generals: data.generals.map((section) => ({
        title: section.title,
        link: section.link,
      })),
    });

    const newData = await props.getData();
    setData(newData);
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
          value={data.title}
          onChange={titleChangeHandler}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Beschreibung</label>
        <Textarea
          placeholder="Beschreibung"
          rows={3}
          value={data.body}
          onChange={bodyChangeHandler}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p>News</p>

        {data.news.map((section) => (
          <LinkSection
            key={section.id}
            id={section.id}
            title={section.title}
            link={section.link}
            removeSection={removeNewsSection}
            updateSection={updateNewsSection}
          />
        ))}

        <button
          className="w-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={addNewsSection}
        >
          Neue News hinzufügen
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p>Allgemeine Informationen</p>

        {data.generals.map((section) => (
          <LinkSection
            key={section.id}
            id={section.id}
            title={section.title}
            link={section.link}
            updateSection={updateGeneralsSection}
            removeSection={removeGeneralsSection}
          />
        ))}

        <button
          className="w-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={addGeneralsSection}
        >
          Neue Allgemeine Information hinzufügen
        </button>
      </div>

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
      </div>
    </form>
  );
}
