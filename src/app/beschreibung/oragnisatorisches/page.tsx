import {
  findOneOrganizationchannels,
  mapOrganizationchannel,
  updateOneOrganizationchannels,
} from "@/services/mongoDbService/organizationchannels";

import Form from "./components/Form";

export default async function Page() {
  const getData = async () => {
    "use server";

    const newData = await findOneOrganizationchannels();
    if (!newData) throw "Unknown error";
    if (!newData.success) throw newData.error;

    return mapOrganizationchannel(newData.data);
  };

  const data = await getData();

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">Organisatorisches</h1>

      <Form
        data={data}
        getData={getData}
        updateData={updateOneOrganizationchannels}
      />
    </div>
  );
}
