import {
  findOneBlackboardchannels,
  mapBlackboardchannel,
  updateOneBlackboardchannels,
} from "@/services/mongoDbService/blackboardchannels";

import Form from "./components/Form";

let rerender = 0;
export default async function Page() {
  const getData = async () => {
    "use server";

    const newData = await findOneBlackboardchannels();
    if (!newData) throw "Unknown error";
    if (!newData.success) throw newData.error;

    return mapBlackboardchannel(newData.data);
  };

  const data = await getData();

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">Schwarze Brett</h1>

      <Form
        data={data}
        getData={getData}
        updateData={updateOneBlackboardchannels}
      />
    </div>
  );
}
