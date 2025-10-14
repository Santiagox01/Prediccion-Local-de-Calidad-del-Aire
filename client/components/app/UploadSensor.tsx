import React, { useRef, useState } from "react";

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

function parseCSV(text: string): SensorRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const header = lines[0].split(",").map((h) => h.trim());
  const idx = (k: string) => header.indexOf(k);
  const req = ["timestamp","sensor_id","lat","lon","pm1_0","pm2_5","pm10_0","temp_c","rh_pct"];
  const missing = req.filter(k => !header.includes(k));
  if (missing.length) throw new Error(`CSV faltan columnas: ${missing.join(", ")}`);
  const out: SensorRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");
    if (row.length < header.length) continue;
    out.push({
      timestamp: row[idx("timestamp")],
      sensor_id: row[idx("sensor_id")],
      lat: Number(row[idx("lat")]),
      lon: Number(row[idx("lon")]),
      pm1_0: Number(row[idx("pm1_0")]),
      pm2_5: Number(row[idx("pm2_5")]),
      pm10_0: Number(row[idx("pm10_0")]),
      temp_c: Number(row[idx("temp_c")]),
      rh_pct: Number(row[idx("rh_pct")]),
    });
  }
  return out;
}

export const UploadSensor: React.FC<{
  onUploaded?: (rows: SensorRow[]) => void;
}> = ({ onUploaded }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [rows, setRows] = useState<SensorRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (f: File) => {
    setError(null);
    const text = await f.text();
    try {
      const parsed = parseCSV(text);
      setRows(parsed);
      setLoading(true);
      const res = await fetch("/api/upload_sensor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: parsed }),
      });
      if (!res.ok) throw new Error(await res.text());
      onUploaded?.(parsed);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Subir CSV (sensor simulado)</div>
          <p className="text-sm text-muted-foreground">Formato requerido: timestamp, sensor_id, lat, lon, pm1_0, pm2_5, pm10_0, temp_c, rh_pct</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
          />
          <button
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
            onClick={() => fileRef.current?.click()}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Subir CSV"}
          </button>
        </div>
      </div>
      {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
      {rows.length > 0 && (
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted">
                {Object.keys(rows[0]).map((k) => (
                  <th key={k} className="px-2 py-1 text-left font-medium">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 5).map((r, i) => (
                <tr key={i} className="border-t">
                  {Object.values(r).map((v, j) => (
                    <td key={j} className="px-2 py-1 whitespace-nowrap">{String(v)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-muted-foreground mt-2">Mostrando 5 filas de {rows.length}.</div>
        </div>
      )}
    </div>
  );
};
