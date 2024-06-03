import {
  findTeamChannels,
  mapTeamChannel,
  updateOneTeamChannel,
} from "@/services/mongoDbService/teamchannels";

import FormList from "./components/FormList";

export default async function Page() {
  const getData = async () => {
    "use server";

    const newData = await findTeamChannels();
    if (!newData) throw "Unknown error";
    if (!newData.success) throw newData.error;

    return newData.data.map(mapTeamChannel);
  };

  const data = await getData();

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">Team Channels</h1>

      <FormList
        data={data}
        getData={getData}
        updateData={updateOneTeamChannel}
      />
    </div>
  );
}
