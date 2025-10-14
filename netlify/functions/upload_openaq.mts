import type { Context, Config } from "@netlify/functions";

type OpenAQRow = Record<string, any>;

export default async (req: Request, context: Context) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { rows } = body as { rows: OpenAQRow[] };

    if (!rows || !Array.isArray(rows)) {
      return new Response("Invalid data format", { status: 400 });
    }

    // Log the received data for debugging
    console.log(`Received ${rows.length} OpenAQ data rows`);
    
    // Here you could validate specific OpenAQ columns and store the data
    // Expected columns: timestamp|date.utc, lat|latitude, lon|longitude, value|pm25_openaq, unit
    
    // Optional: Store data using Netlify Blobs for persistence
    // const { getStore } = await import("@netlify/blobs");
    // const store = getStore("openaq-data");
    // await store.set(`openaq-data-${Date.now()}`, JSON.stringify(rows));

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully processed ${rows.length} OpenAQ data rows`,
      rowCount: rows.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error processing OpenAQ upload:", error);
    return new Response("Error processing upload", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/upload_openaq"
};