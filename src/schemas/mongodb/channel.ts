import { z } from "zod";

export const ChannelZodSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  isBotChannel: z.boolean(),
});

export type Channel = z.infer<typeof ChannelZodSchema>;
