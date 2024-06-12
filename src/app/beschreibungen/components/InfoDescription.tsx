import { InfoDescriptionWithId } from "@/schemas/mongodb/infodescription";
import clsx from "clsx";
import { useState } from "react";

import { InfoDescriptionDetails } from "./InfoDescriptionDetails";
import { InfoDescriptionHeader } from "./InfoDescriptionHeader";

type Props = {
  infoDescription: InfoDescriptionWithId;
};

export function InfoDescription(props: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const toggleDetails = () => {
    setDetailsOpen((p) => !p);
  };

  const detailsParentClasses = clsx(
    "grid grid-rows-[0fr] transition-[grid-template-rows] duration-500",
    { "grid-rows-[1fr]": detailsOpen }
  );

  return (
    <div className="rounded-lg bg-neutral-800 p-4 shadow-md">
      <InfoDescriptionHeader
        name={props.infoDescription.name}
        channelName={props.infoDescription.channel.name}
        detailsOpen={detailsOpen}
        toggleDetails={toggleDetails}
      />

      <div className={detailsParentClasses}>
        <div className="overflow-hidden">
          <InfoDescriptionDetails />
        </div>
      </div>
    </div>
  );
}
