import { EntryWithId } from "@/schemas/mongodb/infodescription";
import { FaPlus, FaTrash } from "react-icons/fa6";

import InnerEntry from "./InnerEntry";

type Props = {
  index: number;
  id: string;
  entries: EntryWithId[];
  addInnerEntry: (outerEntryId: string) => void;
  removeInnerEntry: (outerEntryId: string, id: string) => void;
  removeOuterEntry: (id: string) => void;
  entryFieldChangeHandler: (outerEntryId: string, value: EntryWithId) => void;
};

export default function OuterEntries(props: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-500 p-2">
      <div className="flex items-center gap-2">
        <p className="px-6 text-lg font-bold">Abschnitt {props.index + 1}</p>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-1 font-bold text-neutral-900 hover:bg-opacity-75"
            title="Beschreibung auf dem Teamspeak anpassen"
            onClick={() => props.removeOuterEntry(props.id)}
          >
            <FaTrash />
            Abschnitt entfernen
          </button>
        </div>
      </div>

      {props.entries.map((x, i) => (
        <InnerEntry
          key={x.id}
          index={i}
          outerEntryId={props.id}
          entry={x}
          removeInnerEntry={props.removeInnerEntry}
          entryFieldChangeHandler={props.entryFieldChangeHandler}
        />
      ))}

      <button
        className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-1 font-bold text-neutral-900 hover:bg-opacity-75"
        title="Beschreibung auf dem Teamspeak anpassen"
        onClick={() => props.addInnerEntry(props.id)}
      >
        Unterabschnitt hinzufügen
      </button>
    </div>
  );
}
