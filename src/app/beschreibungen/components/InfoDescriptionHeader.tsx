import { InfoDescriptionWithId } from "@/schemas/mongodb/infodescription";
import { saveInfoDescription } from "@/services/mongoDbService/infodescription";
import editInfoDescriptionChannel from "@/services/teamspeakApiService/editInfoDescriptionChannel";
import clsx from "clsx";
import {
  FaChevronDown,
  FaFloppyDisk,
  FaTeamspeak,
  FaTrashCan,
} from "react-icons/fa6";

type Props = {
  infoDescription: InfoDescriptionWithId;
  detailsOpen: boolean;
  toggleDetails: () => void;
};

export function InfoDescriptionHeader(props: Props) {
  const toggleButttonClasses = clsx("p-4 transition-transform duration-500", {
    "rotate-180": props.detailsOpen,
  });

  const databaseButtonCLickHandler = async () => {
    await saveInfoDescription(props.infoDescription);
  };

  const teamspeakButtonCLickHandler = async () => {
    await editInfoDescriptionChannel(props.infoDescription);
  };

  const descriptionText = `Teamspeak Channel: ${props.infoDescription.channel.name}`;

  return (
    <div className="flex items-stretch gap-4">
      <div className="flex items-center">
        <button className={toggleButttonClasses} onClick={props.toggleDetails}>
          <FaChevronDown />
        </button>
      </div>

      <div>
        <h3>{props.infoDescription.name}</h3>
        <p className="text-sm text-neutral-400">{descriptionText}</p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="rounded-lg bg-green-600 p-4 hover:bg-opacity-75"
          title="Beschreibung speichern"
          onClick={databaseButtonCLickHandler}
        >
          <FaFloppyDisk />
        </button>

        <button
          className="rounded-lg bg-quadro p-4 hover:bg-opacity-75"
          title="Beschreibung auf dem Teamspeak anpassen"
          onClick={teamspeakButtonCLickHandler}
        >
          <FaTeamspeak />
        </button>

        <button
          className="rounded-lg bg-red-700 bg-opacity-75 p-4 hover:bg-opacity-75"
          title="Beschreibung entfernen"
          disabled
        >
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
}
