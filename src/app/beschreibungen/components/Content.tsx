import { InfoDescriptionWithId } from "@/schemas/mongodb/infodescription";
import { findArrayOfInfoDescriptions } from "@/services/mongoDbService/infodescription";
import { useEffect, useState } from "react";

import { InfoDescription } from "./InfoDescription";

type Props = {};

export default function Content(props: Props) {
  const [infodescriptions, setInfoDescriptions] = useState<
    InfoDescriptionWithId[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const data = await findArrayOfInfoDescriptions(token);
      if (!data) return;

      setInfoDescriptions(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {infodescriptions.map((infoDescription) => (
        <InfoDescription
          key={infoDescription._id}
          infoDescription={infoDescription}
        />
      ))}
    </div>
  );
}
