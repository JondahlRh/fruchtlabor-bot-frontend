import Select from "@/app/components/form/Select";
import Textfield from "@/app/components/form/Textfield";
import { EntryWithId, LinkWithId } from "@/schemas/mongodb/infodescription";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

import LinkSection from "./LinkSection";

const ENTRY_TYPES_OBJECT: Record<EntryWithId["type"], string> = {
  linkOnly: "Nur Link anzeigen",
  hereLabel: 'Link mit "hier" Label anzeigen',
  table: "Link in zwei Spalten anzeigen",
};
const ENTRY_TYPES_ARRAY = Object.entries(ENTRY_TYPES_OBJECT).map((x) => ({
  _id: x[0],
  name: x[1],
}));

const getDefaultOption = (type: EntryWithId["type"]) => {
  return { _id: type, name: ENTRY_TYPES_OBJECT[type] };
};

const getDefaultLink = () => ({ id: nanoid(), label: "", url: "" });

type Props = {
  outerEntryId: string;
  index: number;
  entry: EntryWithId;
  removeInnerEntry: (outerEntryId: string, id: string) => void;
  entryFieldChangeHandler: (outerEntryId: string, value: EntryWithId) => void;
};

export default function InnerEntry(props: Props) {
  const { outerEntryId, entryFieldChangeHandler } = props;
  const { id, title, subtitle, type, links } = props.entry;

  const [inpTitle, setInpTitle] = useState(title);
  const [inpSubtitle, setInpSubtitle] = useState(subtitle ?? "");
  const [inpType, setInpType] = useState(type);
  const [inpLinks, setInpLinks] = useState(links);

  useEffect(() => {
    const timeout = setTimeout(() => {
      entryFieldChangeHandler(outerEntryId, {
        id,
        title: inpTitle,
        subtitle: inpSubtitle,
        type: inpType,
        links: inpLinks,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [
    entryFieldChangeHandler,
    outerEntryId,
    id,
    inpTitle,
    inpSubtitle,
    inpType,
    inpLinks,
  ]);

  const addLink = () => {
    setInpLinks((p) => [...p, getDefaultLink()]);
  };
  const editLink = useCallback((value: LinkWithId) => {
    setInpLinks((p) => p.map((x) => (x.id === value.id ? value : x)));
  }, []);
  const removeLink = (id: string) => {
    setInpLinks((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-500 p-2">
      <div className="flex items-center gap-2">
        <p className="text-md px-1">
          {/* Unterabschnitt {props.index + 1} */}
          <span className="font-bold">Unterabschnitt: </span>
          {inpTitle}
        </p>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-1 font-bold text-neutral-900 hover:bg-opacity-75"
            title="Beschreibung auf dem Teamspeak anpassen"
            onClick={() =>
              props.removeInnerEntry(props.outerEntryId, props.entry.id)
            }
          >
            <FaTrash />
            Unterabschnitt entfernen
          </button>
        </div>
      </div>

      <Textfield
        placeholder="Titel"
        label="Titel"
        smallLabel
        rows={3}
        value={inpTitle}
        changeHandler={(value) => setInpTitle(value)}
      />
      <Textfield
        placeholder="Untertitel"
        label="Untertitel"
        smallLabel
        rows={3}
        value={inpSubtitle}
        changeHandler={(value) => setInpSubtitle(value)}
      />
      <Select
        label="Link Style"
        smallLabel
        changeHandler={(value) => setInpType(value._id as EntryWithId["type"])} //? not 100% sure
        defaultOption={getDefaultOption(inpType)}
        options={ENTRY_TYPES_ARRAY}
      />

      <div>
        <p className="text-sm font-bold">Links</p>

        <div className="flex flex-col gap-1">
          {props.entry.links.map((x) => (
            <LinkSection
              key={x.id}
              id={x.id}
              label={x.label}
              url={x.url}
              editLink={editLink}
              removeLink={removeLink}
            />
          ))}

          <button
            className="flex w-full justify-center rounded-md bg-primary p-1 font-bold text-neutral-900"
            onClick={addLink}
          >
            Link hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
}
