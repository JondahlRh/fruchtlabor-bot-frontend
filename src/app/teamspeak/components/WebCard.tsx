"use client";

import { FaCopy, FaPen, FaTrash } from "react-icons/fa6";

import DbidCopyText from "./DbidCopyText";

type WebCardProps = {
  _id: string;
  name: string;
  children?: React.ReactNode;
  id?: { key: string; value: number };
  chips?: { visible: boolean; title: string }[];
};

const WebCard = (props: WebCardProps) => {
  const editButtonClickHandler = () => {
    console.log(props._id);
  };

  const idCopyButtonClickHandler = () => {
    if (!props.id) return;

    navigator.clipboard.writeText(props.id.value.toString());
  };

  return (
    <div className="flex-1 basis-96">
      <div className="flex h-full flex-col gap-2 rounded-xl bg-neutral-800 p-4 shadow-lg hover:bg-opacity-80">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <h3 className="line-clamp-1 text-lg font-bold" title={props.name}>
                {props.name}
              </h3>

              {props.id && (
                <button
                  className="rounded-full bg-primary px-4 font-bold text-neutral-900 hover:bg-opacity-50"
                  onClick={idCopyButtonClickHandler}
                  title={`${props.id.key} Id`}
                >
                  {props.id.value}
                </button>
              )}
            </div>

            <DbidCopyText _id={props._id} />
          </div>

          <div className="ml-auto flex flex-col gap-2">
            <button
              className="rounded-lg bg-secondary hover:bg-opacity-80"
              onClick={editButtonClickHandler}
              title="Bearbeiten"
            >
              <FaPen className="m-2 text-neutral-900" />
            </button>
            <button
              className="rounded-lg bg-red-700 hover:bg-opacity-80"
              onClick={editButtonClickHandler}
              title="Löschen"
            >
              <FaTrash className="m-2 text-neutral-900" />
            </button>
          </div>
        </div>

        <div className="text-sm">{props.children}</div>

        <div className="flex gap-2">
          {props.chips?.map(
            (chip) =>
              chip.visible && (
                <div className="rounded-full bg-tertiary px-4 font-bold text-neutral-900">
                  {chip.title}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default WebCard;
