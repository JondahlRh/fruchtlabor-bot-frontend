"use server";

import { InfoDescriptionWithId } from "@/schemas/mongodb/infodescription";

import teamspeakApiService from ".";

export default async function editInfoDescriptionChannel(
  infodescription: InfoDescriptionWithId
) {
  const entrySections = infodescription.entrySections.map((outerEntry) =>
    outerEntry.entries.map((innerEntry) => ({
      title: innerEntry.title,
      subtitle: innerEntry.subtitle,
      type: innerEntry.type,
      links: innerEntry.links.map((link) => ({
        label: link.label,
        url: link.url,
      })),
    }))
  );

  const data = {
    _id: infodescription._id,
    name: infodescription.name,
    channel: infodescription.channel._id,
    title: infodescription.title,
    subtitle: infodescription.subtitle,
    description: infodescription.description,
    entrySections,
  };

  try {
    await teamspeakApiService.post("/bot/infodescription", data);
  } catch (error) {
    return null;
  }
}
