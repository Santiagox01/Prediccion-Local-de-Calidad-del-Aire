import type { Context, Config } from "@netlify/functions";

type SensorRow = {
  timestamp: string;
  sensor_id: string;
  lat: number;
  lon: number;
  pm1_0: number;
  pm2_5: number;
  pm10_0: number;
  temp_c: number;
  rh_pct: number;
};

export default async (req: Request, context: Context) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { rows } = body as { rows: SensorRow[] };

    if (!rows || !Array.isArray(rows)) {
      return new Response("Invalid data format", { status: 400 });
    }

    // Validate required fields for each row
    const requiredFields = ["timestamp", "sensor_id", "lat", "lon", "pm1_0", "pm2_5", "pm10_0", "temp_c", "rh_pct"];
    
    for (const row of rows) {
      for (const field of requiredFields) {
        if (!(field in row)) {
          return new Response(`Missing required field: ${field}`, { status: 400 });
        }
      }
    }

    // Here you could store the data in a database, Netlify Blobs, or process it further
    // For now, we'll just log the data and return success
    console.log(`Received ${rows.length} sensor data rows`);
    
    // Optional: Store data using Netlify Blobs for persistence
    // const { getStore } = await import("@netlify/blobs");
    // const store = getStore("sensor-data");
    // await store.set(`sensor-data-${Date.now()}`, JSON.stringify(rows));

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully processed ${rows.length} sensor data rows`,
      rowCount: rows.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error processing sensor upload:", error);
    return new Response("Error processing upload", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/upload_sensor"
};