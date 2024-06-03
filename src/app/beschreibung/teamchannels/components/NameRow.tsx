import { useCallback, useEffect, useState } from "react";

import Textarea from "../../components/Textarea";
import { NameWithId } from "./FormList";

type Props = {
  id: number;
  name: string;
  updateNameRow: (newNameRow: NameWithId) => void;
  removeNameRow: (id: number) => void;
};

export default function NameRow(props: Props) {
  const { id, updateNameRow } = props;
  const [inpName, setInpName] = useState(props.name);

  useEffect(() => {
    const timeout = setTimeout(() => {
      return () => clearTimeout(timeout);
    }, 300);
  }, [updateNameRow, id, inpName]);

  const removeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.removeNameRow(props.id);
  };

  return (
    <div className="grid grid-cols-11 gap-1">
      <div className="col-span-10">
        <Textarea
          placeholder="Label"
          rows={1}
          value={inpName}
          onChange={(e) => setInpName(e.target.value)}
        />
      </div>

      <div>
        <button
          className="h-full w-full rounded-lg bg-red-600 p-1 hover:bg-opacity-75"
          onClick={removeHandler}
        >
          Entfernen
        </button>
      </div>
    </div>
  );
}
