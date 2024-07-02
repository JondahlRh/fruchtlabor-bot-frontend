import { ObjectId } from "mongodb";
import { z } from "zod";

export const ChannelZodSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  isBotChannel: z.boolean(),
});
export type Channel = z.infer<typeof ChannelZodSchema>;

export const ChannelWithIdZodSchema = z.object({
  _id: z.string(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  isBotChannel: z.boolean(),
});
export type ChannelWithId = z.infer<typeof ChannelWithIdZodSchema>;
