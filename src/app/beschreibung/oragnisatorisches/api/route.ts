import axios from "axios";

export async function PUT(req: Request) {
  try {
    const { apikey } = await req.json();
    if (!apikey) throw "No apikey provided";

    console.log(apikey);
    await axios.post(
      "/bot/organizationchannel",
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
