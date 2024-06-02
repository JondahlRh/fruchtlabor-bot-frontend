import Textarea from "../../components/Textarea";
import type { LinkWithId, MultiSectionWithId } from "./Form";
import LinkRow from "./LinkRow";

type Props = {
  multiSection: MultiSectionWithId;
  updateTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addLinkRow: () => void;
  updateLinkRow: (newLinkRow: LinkWithId) => void;
  removeLinkRow: (id: number) => void;
};

export default function MultiSectionArea(props: Props) {
  const addLinkRowHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.addLinkRow();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Textarea
          placeholder="Titel"
          rows={2}
          value={props.multiSection.title}
          onChange={props.updateTitle}
        />
      </div>

      <div className="grid grid-cols-11 gap-1">
        {props.multiSection.links.map((link) => (
          <LinkRow
            key={link.id}
            id={link.id}
            label={link.label}
            url={link.url}
            updateLinkRow={props.updateLinkRow}
            removeLinkRow={props.removeLinkRow}
          />
        ))}

        <button
          className="col-span-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={addLinkRowHandler}
        >
          Link hinzufügen
        </button>
      </div>
    </div>
  );
}
