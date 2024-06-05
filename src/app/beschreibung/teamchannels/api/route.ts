import axios from "axios";

export async function PUT(req: Request) {
  try {
    const apikey = req.headers.get("Authorization");
    if (!apikey) throw "No apikey provided";

    await axios.post(
      "/bot/teamchannel",
      {},
      {
        baseURL: process.env.TEAMSPEAK_API_URL,
        headers: { Authorization: `Bearer ${apikey}` },
      }
    );

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}
