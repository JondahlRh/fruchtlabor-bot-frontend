import { useEffect, useState } from "react";

import type { SectionWithID } from "./Form";
import Textarea from "./Textarea";

type LinkSectionProps = {
  removeSection: (index: number) => void;
  updateSection: (index: number, newSection: SectionWithID) => void;
} & SectionWithID;

export default function LinkSection(props: LinkSectionProps) {
  const { id, updateSection } = props;

  const [inpTitle, setInpTitle] = useState(props.title);
  const [inpLabel, setInpLabel] = useState(props.link.label);
  const [inpUrl, setInpUrl] = useState(props.link.url);

  const removeSectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.removeSection(id);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSection(id, {
        id: id,
        title: inpTitle,
        link: { label: inpLabel, url: inpUrl },
      });

      return () => clearTimeout(timeout);
    }, 300);
  }, [updateSection, id, inpLabel, inpTitle, inpUrl]);

  return (
    <div className="grid grid-cols-11 gap-4">
      <div className="col-span-10 flex flex-col gap-2">
        <Textarea
          placeholder="Titel"
          rows={2}
          value={inpTitle}
          onChange={(e) => setInpTitle(e.target.value)}
        />

        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-3">
            <Textarea
              placeholder="Titel"
              rows={1}
              value={inpLabel}
              onChange={(e) => setInpLabel(e.target.value)}
            />
          </div>
          <div className="col-span-7">
            <Textarea
              placeholder="Titel"
              rows={1}
              value={inpUrl}
              onChange={(e) => setInpUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          className="h-full w-full rounded-lg bg-red-600 p-1 hover:bg-opacity-75"
          onClick={removeSectionHandler}
        >
          Entfernen
        </button>
      </div>
    </div>
  );
}
