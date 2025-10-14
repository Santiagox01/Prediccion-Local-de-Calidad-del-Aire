import type { Context, Config } from "@netlify/functions";

type TempoRow = Record<string, any>;

export default async (req: Request, context: Context) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { rows } = body as { rows: TempoRow[] };

    if (!rows || !Array.isArray(rows)) {
      return new Response("Invalid data format", { status: 400 });
    }

    // Log the received data for debugging
    console.log(`Received ${rows.length} TEMPO data rows`);
    
    // Here you could validate specific TEMPO columns and store the data
    // Expected columns: time|timestamp, lat, lon, no2_tempo|no2, o3_tempo|o3, aod
    
    // Optional: Store data using Netlify Blobs for persistence
    // const { getStore } = await import("@netlify/blobs");
    // const store = getStore("tempo-data");
    // await store.set(`tempo-data-${Date.now()}`, JSON.stringify(rows));

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully processed ${rows.length} TEMPO data rows`,
      rowCount: rows.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error processing TEMPO upload:", error);
    return new Response("Error processing upload", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/upload_tempo"
};