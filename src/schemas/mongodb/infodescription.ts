import { ObjectId } from "mongodb";
import { z } from "zod";

import { ChannelZodSchema } from "./channel";

const LinkZodSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const EntryZodSchema = z.object({
  type: z.enum(["linkOnly", "hereLabel", "table"]),
  title: z.string(),
  subtitle: z.string().optional(),
  links: z.array(LinkZodSchema),
});

export const InfoDescriptionZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  channel: ChannelZodSchema,
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  entrySections: z.array(z.array(EntryZodSchema)),
});
export type InfoDescription = z.infer<typeof InfoDescriptionZodSchema>;

export type LinkWithId = {
  id: string;
  label: string;
  url: string;
};
export type EntryWithId = {
  id: string;
  type: "linkOnly" | "hereLabel" | "table";
  title: string;
  subtitle?: string;
  links: LinkWithId[];
};
type EntryArrayWithId = {
  id: string;
  entries: EntryWithId[];
};
export type InfoDescriptionWithId = {
  _id: string;
  name: string;
  channel: { _id: string; name: string };
  title: string;
  subtitle?: string;
  description?: string;
  entrySections: EntryArrayWithId[];
};

export const UnpopulatedInfoDescriptionZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  channel: z.instanceof(ObjectId),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  entrySections: z.array(z.array(EntryZodSchema)),
});
export type UnpopulatedInfoDescription = z.infer<
  typeof UnpopulatedInfoDescriptionZodSchema
>;
