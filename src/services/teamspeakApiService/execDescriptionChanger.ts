import axios from "axios";

export const execOrganizationchannel = async (apikey: string) => {
  try {
    await axios.post(
      "/bot/organizationchannel",
      {},
      {
        baseURL: process.env.NEXT_PUBLIC_TEAMSPEAK_API_URL,
        headers: { Authorization: `Bearer ${apikey}` },
      }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const execBlackboardchannel = async (apikey: string) => {
  try {
    await axios.post(
      "/bot/blackboardchannel",
      {},
      {
        baseURL: process.env.NEXT_PUBLIC_TEAMSPEAK_API_URL,
        headers: { Authorization: `Bearer ${apikey}` },
      }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const execTeamchannel = async (apikey: string) => {
  try {
    await axios.post(
      "/bot/teamchannel",
      {},
      {
        baseURL: process.env.NEXT_PUBLIC_TEAMSPEAK_API_URL,
        headers: { Authorization: `Bearer ${apikey}` },
      }
    );

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
