import Textfield from "@/app/components/form/Textfield";
import { LinkWithId } from "@/schemas/mongodb/infodescription";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

type Props = {
  id: string;
  label: string;
  url: string;
  editLink: (value: LinkWithId) => void;
  removeLink: (id: string) => void;
};

export default function LinkSection(props: Props) {
  const { id, editLink } = props;
  const [inpLabel, setInpLabel] = useState(props.label);
  const [inpUrl, setInpUrl] = useState(props.url);

  useEffect(() => {
    const timeout = setTimeout(() => {
      editLink({ id, label: inpLabel, url: inpUrl });
    }, 300);

    return () => clearTimeout(timeout);
  }, [editLink, id, inpLabel, inpUrl]);

  return (
    <div className="flex gap-1">
      <div className="grid w-full grid-cols-10 gap-1">
        <div className="col-span-3">
          <Textfield
            placeholder="Label"
            rows={1}
            value={inpLabel}
            changeHandler={(value) => setInpLabel(value)}
          />
        </div>
        <div className="col-span-7">
          <Textfield
            placeholder="URL"
            rows={1}
            value={inpUrl}
            changeHandler={(value) => setInpUrl(value)}
          />
        </div>
      </div>

      <button
        className="flex items-center justify-center rounded-md bg-red-500 px-2 py-1 font-bold text-neutral-900 hover:bg-opacity-75"
        onClick={() => props.removeLink(props.id)}
      >
        <FaTrash />
      </button>
    </div>
  );
}
