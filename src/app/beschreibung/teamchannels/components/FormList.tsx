"use client";

import { execTeamchannel } from "@/services/teamspeakApiService/execDescriptionChanger";
import { useState } from "react";

import Form from "./Form";

export type NameWithId = {
  id: number;
  name: string;
};

export type LinkWithId = {
  id: number;
  label: string;
  url: string;
};

export type TeamchannelState = {
  _id: string;
  name: string;
  type: string;
  links: LinkWithId[];
  players: NameWithId[];
  standins: NameWithId[];
  trainingTimes: NameWithId[];
  extraBody: string;
};

type Props = {
  data: TeamchannelState[];
  getData: () => Promise<TeamchannelState[]>;
  updateData: (data: TeamchannelState) => Promise<{ success: boolean }>;
};

export default function FormList(props: Props) {
  const [teamchannels, setTeamchannels] = useState<TeamchannelState[]>(
    props.data
  );

  const resetData = async () => {
    const data = await props.getData();
    setTeamchannels(data);
  };
  const execHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await execTeamchannel(localStorage.getItem("apikey") ?? "");
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-neutral-700 p-4">
      {teamchannels.map((x) => (
        <Form
          key={x._id.toString()}
          data={x}
          updateData={props.updateData}
          resetData={resetData}
        />
      ))}

      <div className="flex justify-center gap-4">
        <button
          className="min-w-48 rounded-lg bg-tertiary py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={resetData}
        >
          Zurücksetzen
        </button>
        <button
          className="min-w-48 rounded-lg bg-quadro py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={execHandler}
        >
          Teamspeak anpasen
        </button>
      </div>
    </div>
  );
}
