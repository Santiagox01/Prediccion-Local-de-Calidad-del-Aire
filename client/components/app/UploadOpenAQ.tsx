import React, { useRef, useState } from "react";

type Row = Record<string, any>;

function parseCSV(text: string): Row[] {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const header = lines[0].split(",").map((h) => h.trim());
  const out: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");
    if (!row.length) continue;
    const obj: Row = {};
    header.forEach((h, idx) => (obj[h] = row[idx]));
    out.push(obj);
  }
  return out;
}

export const UploadOpenAQ: React.FC<{ onUploaded?: () => void }>= ({ onUploaded }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (f: File) => {
    setError(null);
    const text = await f.text();
    try {
      const rows = parseCSV(text);
      setLoading(true);
      const res = await fetch("/api/upload_openaq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      if (!res.ok) throw new Error(await res.text());
      onUploaded?.();
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
          <div className="text-lg font-semibold">Subir CSV (OpenAQ)</div>
          <p className="text-sm text-muted-foreground">Columnas sugeridas: timestamp|date.utc, lat|latitude, lon|longitude, value|pm25_openaq, unit</p>
        </div>
        <div className="flex items-center gap-2">
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e)=>e.target.files && handleFile(e.target.files[0])} />
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90" onClick={()=>fileRef.current?.click()} disabled={loading}>
            {loading ? "Cargando..." : "Subir CSV"}
          </button>
        </div>
      </div>
      {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
    </div>
  );
};
