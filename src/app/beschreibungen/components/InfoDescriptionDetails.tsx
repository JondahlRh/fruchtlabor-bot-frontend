import SectionWrapper from "@/app/components/SectionWrapper";
import Select from "@/app/components/form/Select";
import Textfield from "@/app/components/form/Textfield";
import { ChannelWithId } from "@/schemas/mongodb/channel";
import {
  EntryWithId,
  InfoDescriptionWithId,
} from "@/schemas/mongodb/infodescription";
import { findArrayOfChannels } from "@/services/mongoDbService/channel";
import nanoid from "@/services/nano";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import OuterEntries from "./OuterEntries";

const getOuterEntry = () => ({ id: nanoid(), entries: [] });
const getInnerEntry = () => ({
  id: nanoid(),
  type: "linkOnly" as const,
  title: "",
  subtitle: "",
  links: [],
});

type Props = {
  infoDescription: InfoDescriptionWithId;
  setInfoDescription: Dispatch<SetStateAction<InfoDescriptionWithId>>;
};

export function InfoDescriptionDetails(props: Props) {
  const { infoDescription, setInfoDescription } = props;

  const [channels, setChannels] = useState<ChannelWithId[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await findArrayOfChannels();
      if (!data) return;

      setChannels(data);
    };

    fetchData();
  }, []);

  const fieldChangeHandler = <T extends keyof InfoDescriptionWithId>(
    type: T,
    value: (typeof infoDescription)[T]
  ) => {
    setInfoDescription((p) => ({ ...p, [type]: value }));
  };

  const addOuterEntry = () => {
    setInfoDescription((p) => ({
      ...p,
      entrySections: [...p.entrySections, getOuterEntry()],
    }));
  };
  const removeOuterEntry = (id: string) => {
    setInfoDescription((p) => ({
      ...p,
      entrySections: p.entrySections.filter((x) => x.id !== id),
    }));
  };

  const addInnerEntry = (outerEntryId: string) => {
    setInfoDescription((p) => {
      const newEntrySections = p.entrySections.map((x) => {
        if (x.id !== outerEntryId) return x;
        return { ...x, entries: [...x.entries, getInnerEntry()] };
      });

      return { ...p, entrySections: newEntrySections };
    });
  };
  const removeInnerEntry = (outerEntryId: string, id: string) => {
    setInfoDescription((p) => {
      const newEntrySections = p.entrySections.map((x) => {
        if (x.id !== outerEntryId) return x;

        const newInnerEntries = x.entries.filter((x) => x.id !== id);
        return { ...x, entries: newInnerEntries };
      });

      return { ...p, entrySections: newEntrySections };
    });
  };

  const entryFieldChangeHandler = useCallback(
    (outerEntryId: string, value: EntryWithId) => {
      setInfoDescription((p) => {
        const newEntrySections = p.entrySections.map((outerEntry) => {
          if (outerEntry.id !== outerEntryId) return outerEntry;

          const newInnerEntries = outerEntry.entries.map((innerEntry) => {
            if (innerEntry.id !== value.id) return innerEntry;
            return value;
          });

          return { ...outerEntry, entries: newInnerEntries };
        });

        return { ...p, entrySections: newEntrySections };
      });
    },
    [setInfoDescription]
  );

  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <SectionWrapper title="Generelle Informationen">
        <Textfield
          label="Name (muss einmalig sein)"
          placeholder="Name"
          rows={1}
          value={infoDescription.name}
          changeHandler={(x) => fieldChangeHandler("name", x)}
        />

        <Select
          label="Teamspeak Channel"
          changeHandler={(x) => fieldChangeHandler("channel", x)}
          defaultOption={infoDescription.channel}
          options={channels}
        />
      </SectionWrapper>

      <SectionWrapper title="Teamspeak Beschreibung">
        <Textfield
          label="Überschrift"
          placeholder="Überschrift"
          rows={3}
          value={infoDescription.title}
          changeHandler={(x) => fieldChangeHandler("title", x)}
        />
        <Textfield
          label="Unterüberschrift"
          placeholder="Unterüberschrift"
          rows={3}
          value={infoDescription.subtitle ?? ""}
          changeHandler={(x) => fieldChangeHandler("subtitle", x)}
        />
        <Textfield
          label="Beschreibung"
          placeholder="Beschreibung"
          rows={5}
          value={infoDescription.description ?? ""}
          changeHandler={(x) => fieldChangeHandler("description", x)}
        />

        <div className="flex flex-col gap-4 py-2">
          {infoDescription.entrySections.map((x, index) => (
            <OuterEntries
              key={x.id}
              index={index}
              id={x.id}
              entries={x.entries}
              addInnerEntry={addInnerEntry}
              removeInnerEntry={removeInnerEntry}
              removeOuterEntry={removeOuterEntry}
              entryFieldChangeHandler={entryFieldChangeHandler}
            />
          ))}

          <button
            className="flex w-full justify-center rounded-md bg-secondary p-1 font-bold text-neutral-900"
            onClick={addOuterEntry}
          >
            Abschnitt hinzufügen
          </button>
        </div>
      </SectionWrapper>
    </form>
  );
}
