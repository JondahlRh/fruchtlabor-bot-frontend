import { ObjectId } from "mongodb";
import { z } from "zod";

const LinkZodSchema = z.object({
  label: z.string(),
  url: z.string(),
});
export type Link = z.infer<typeof LinkZodSchema>;

const SectionZodSchema = z.object({
  title: z.string(),
  link: LinkZodSchema,
});
export type Section = z.infer<typeof SectionZodSchema>;

export const BlackboardchannelZodSchema = z.object({
  title: z.string(),
  body: z.string(),
  news: z.array(SectionZodSchema),
  generals: z.array(SectionZodSchema),
});
export type Blackboardchannel = z.infer<typeof BlackboardchannelZodSchema>;

const MultiSectionZodSchema = z.object({
  title: z.string(),
  links: z.array(LinkZodSchema),
});

export const OrganizationchannelZodSchema = z.object({
  title: z.string(),
  body: z.string(),
  openJobAds: MultiSectionZodSchema,
  closedJobAds: MultiSectionZodSchema,
  categories: z.array(MultiSectionZodSchema),
});
export type Organizationchannel = z.infer<typeof OrganizationchannelZodSchema>;

export const TeamchannelZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  type: z.string(),
  links: z.array(LinkZodSchema),
  players: z.array(z.string()),
  standins: z.array(z.string()),
  trainingTimes: z.array(z.string()),
  extraBody: z.string(),
});
export type Teamchannel = z.infer<typeof TeamchannelZodSchema>;
