import { useCallback, useEffect, useState } from "react";

import Textarea from "../../components/Textarea";
import LinkRow from "../../oragnisatorisches/components/LinkRow";
import { LinkWithId, NameWithId, TeamchannelState } from "./FormList";
import NameRow from "./NameRow";

type Props = {
  data: TeamchannelState;
  updateData: (data: TeamchannelState) => Promise<{ success: boolean }>;
  resetData: () => Promise<void>;
};

export default function Form(props: Props) {
  const [teamchannel, setTeamchannel] = useState(props.data);

  useEffect(() => {
    setTeamchannel(props.data);
  }, [props.data]);

  const textareaChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof TeamchannelState
  ) => {
    setTeamchannel((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const linkRowAddHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTeamchannel((prev) => ({
      ...prev,
      links: [...prev.links, { id: Date.now(), label: "", url: "" }],
    }));
  };
  const linkRowChangeHandler = useCallback((newValue: LinkWithId) => {
    setTeamchannel((prev) => ({
      ...prev,
      links: prev.links.map((x) => (x.id === newValue.id ? newValue : x)),
    }));
  }, []);
  const linkRowRemoveHandler = (id: number) => {
    setTeamchannel((prev) => ({
      ...prev,
      links: prev.links.filter((x) => x.id !== id),
    }));
  };

  const nameRowAddHandler =
    (field: "players" | "standins") =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setTeamchannel((prev) => ({
        ...prev,
        [field]: [...prev[field], { id: Date.now(), name: "" }],
      }));
    };
  const nameRowUpdateHandler = useCallback(
    (field: "players" | "standins") => (newNameRow: NameWithId) => {
      setTeamchannel((prev) => ({
        ...prev,
        [field]: prev[field].map((x) =>
          newNameRow.id === x.id ? newNameRow : x
        ),
      }));
    },
    []
  );
  const nameRowRemoveHandler =
    (field: "players" | "standins") => (id: number) => {
      setTeamchannel((prev) => ({
        ...prev,
        [field]: prev[field].filter((x) => x.id !== id),
      }));
    };

  const onCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await props.resetData();
  };
  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await props.updateData(teamchannel);
  };

  return (
    <form className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-4">
      <div className="flex flex-col gap-1">
        <label>Teamname</label>
        <Textarea
          placeholder="Titel"
          rows={1}
          value={teamchannel.name}
          onChange={(e) => textareaChangeHandler(e, "name")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Team Typ</label>
        <Textarea
          placeholder="Titel"
          rows={1}
          value={teamchannel.type}
          onChange={(e) => textareaChangeHandler(e, "type")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>Links</p>
        <div className="grid grid-cols-11 gap-1">
          {teamchannel.links.map((link) => (
            <LinkRow
              key={link.id}
              id={link.id}
              label={link.label}
              url={link.url}
              updateLinkRow={linkRowChangeHandler}
              removeLinkRow={linkRowRemoveHandler}
            />
          ))}
          <button
            className="col-span-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
            onClick={linkRowAddHandler}
          >
            Hinzufügen
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p>Spieler</p>
        {teamchannel.players.map((player) => (
          <NameRow
            key={player.id}
            id={player.id}
            name={player.name}
            updateNameRow={nameRowUpdateHandler("players")}
            removeNameRow={nameRowRemoveHandler("players")}
          />
        ))}
        <button
          className="col-span-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={(e) => nameRowAddHandler("players")(e)}
        >
          Hinzufügen
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p>Stand Ins</p>
        {teamchannel.standins.map((player) => (
          <NameRow
            key={player.id}
            id={player.id}
            name={player.name}
            updateNameRow={nameRowUpdateHandler("standins")}
            removeNameRow={nameRowRemoveHandler("standins")}
          />
        ))}
        <button
          className="col-span-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={(e) => nameRowAddHandler("standins")(e)}
        >
          Hinzufügen
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label>Extra Beschreibung</label>
        <Textarea
          placeholder="Beschreibung"
          rows={3}
          value={teamchannel.extraBody}
          onChange={(e) => textareaChangeHandler(e, "extraBody")}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="min-w-48 rounded-lg bg-tertiary py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={onCancel}
        >
          Zurücksetzen
        </button>
        <button
          className="min-w-48 rounded-lg bg-primary py-1 font-bold text-neutral-900 hover:bg-opacity-75"
          onClick={onSubmit}
        >
          Speichern
        </button>
      </div>
    </form>
  );
}
