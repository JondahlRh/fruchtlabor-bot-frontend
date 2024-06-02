import { useCallback } from "react";

import type { LinkWithId, MultiSectionWithId } from "./Form";
import MultiSectionArea from "./MultiSectionArea";

type Props = {
  category: MultiSectionWithId;
  updateCategorieTitleHandler: (
    catid: number
  ) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  updateCategorie: (newCategorie: MultiSectionWithId) => void;
  removeCategorie: (id: number) => void;
  addCategorieLinkRow: (catid: number) => () => void;
  updateCategorieLinkRow: (catid: number) => (newLinkRow: LinkWithId) => void;
  removeCategorieLinkRow: (catid: number) => (id: number) => void;
};

export default function CategorieSection(props: Props) {
  const { updateCategorieLinkRow } = props;
  const { id } = props.category;

  const callbackUpdateCategorieLinkRow = useCallback(
    (newLinkRow: LinkWithId) => {
      updateCategorieLinkRow(id)(newLinkRow);
    },
    [id, updateCategorieLinkRow]
  );

  const removeCategorieHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.removeCategorie(props.category.id);
  };

  return (
    <div className="grid w-full grid-cols-10 gap-2 rounded-lg border border-neutral-600 p-2">
      <div className="col-span-9">
        <MultiSectionArea
          multiSection={props.category}
          updateTitle={props.updateCategorieTitleHandler(id)}
          addLinkRow={props.addCategorieLinkRow(id)}
          updateLinkRow={callbackUpdateCategorieLinkRow}
          removeLinkRow={props.removeCategorieLinkRow(id)}
        />
      </div>

      <div className="col-span-1">
        <button
          className="h-full w-full rounded-lg bg-red-600 p-1 hover:bg-opacity-75"
          onClick={removeCategorieHandler}
        >
          Kategorie entfernen
        </button>
      </div>
    </div>
  );
}
