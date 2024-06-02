import { useEffect, useState } from "react";

import Textarea from "../../components/Textarea";
import { LinkWithId } from "./Form";

type Props = {
  id: number;
  label: string;
  url: string;
  updateLinkRow: (newLinkRow: LinkWithId) => void;
  removeLinkRow: (id: number) => void;
};

export default function LinkRow(props: Props) {
  const { id, updateLinkRow } = props;

  const [inpLabel, setInpLabel] = useState(props.label);
  const [inpUrl, setInpUrl] = useState(props.url);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateLinkRow({
        id: id,
        label: inpLabel,
        url: inpUrl,
      });

      return () => clearTimeout(timeout);
    }, 300);
  }, [updateLinkRow, id, inpLabel, inpUrl]);

  const removeLinkRowHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.removeLinkRow(props.id);
  };

  return (
    <>
      <div className="col-span-3">
        <Textarea
          placeholder="Label"
          rows={1}
          value={inpLabel}
          onChange={(e) => setInpLabel(e.target.value)}
        />
      </div>
      <div className="col-span-7">
        <Textarea
          placeholder="URL"
          rows={1}
          value={inpUrl}
          onChange={(e) => setInpUrl(e.target.value)}
        />
      </div>
      <div>
        <button
          className="h-full w-full rounded-lg bg-red-600 p-1 hover:bg-opacity-75"
          onClick={removeLinkRowHandler}
        >
          Entfernen
        </button>
      </div>
    </>
  );
}
