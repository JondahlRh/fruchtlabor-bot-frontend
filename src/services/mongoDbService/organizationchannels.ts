import {
  Link,
  Organizationchannel,
  OrganizationchannelZodSchema,
} from "@/schemas/mongodb";

import init from ".";

let index = 0;
const addIdField = (objArray: Link[]) => {
  return objArray.map((obj) => ({ ...obj, id: Date.now() + index++ }));
};

export const mapOrganizationchannel = (data: Organizationchannel) => {
  return {
    title: data.title,
    body: data.body,
    openJobAds: {
      id: Date.now() + index++,
      title: data.openJobAds.title,
      links: addIdField(data.openJobAds.links),
    },
    closedJobAds: {
      id: Date.now() + index++,
      title: data.closedJobAds.title,
      links: addIdField(data.closedJobAds.links),
    },
    categories: data.categories.map((category) => ({
      id: Date.now() + index++,
      title: category.title,
      links: addIdField(category.links),
    })),
  };
};

export const findOneOrganizationchannels = async () => {
  "use server";

  try {
    const db = await init();
    const data = await db.collection("organizationchannels").findOne();
    return OrganizationchannelZodSchema.safeParse(data);
  } catch (error) {
    return null;
  }
};

export const updateOneOrganizationchannels = async (
  data: Organizationchannel
) => {
  "use server";

  try {
    const mappedData = OrganizationchannelZodSchema.parse(data);

    const db = await init();
    await db
      .collection("organizationchannels")
      .updateOne({}, { $set: mappedData });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
