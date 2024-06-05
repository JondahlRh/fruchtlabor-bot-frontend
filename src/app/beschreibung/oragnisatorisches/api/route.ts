import teamspeakApiService from "@/services/teamspeakApiService";

export async function PUT(req: Request) {
  try {
    const { apikey } = await req.json();
    if (!apikey) throw "No apikey provided";

    teamspeakApiService.defaults.headers["Authorization"] = `Bearer ${apikey}`;
    await teamspeakApiService.post("/bot/organizationchannel");

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}
