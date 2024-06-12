import clsx from "clsx";
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";

type Props = {
  name: string;
  channelName: string;
  detailsOpen: boolean;
  toggleDetails: () => void;
};

export function InfoDescriptionHeader(props: Props) {
  const toggleButttonClasses = clsx("p-4 transition-transform duration-500", {
    "rotate-180": props.detailsOpen,
  });

  const descriptionText = `Teamspeak Channel: ${props.channelName}`;

  return (
    <div className="flex items-stretch gap-4">
      <div className="flex items-center">
        <button className={toggleButttonClasses} onClick={props.toggleDetails}>
          <FaChevronDown />
        </button>
      </div>

      <div>
        <h3>{props.name}</h3>
        <p className="text-sm text-neutral-400">{descriptionText}</p>
      </div>

      <div className="ml-auto flex items-center">
        <button className="rounded-lg bg-red-700 p-4 hover:bg-opacity-75">
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
}
