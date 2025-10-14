import { useEffect, useState } from "react";
import { UploadSensor } from "@/components/app/UploadSensor";
import { KPICards, type UnifiedRecord } from "@/components/app/KPICards";
import { MapView } from "@/components/app/MapView";
import { Charts } from "@/components/app/Charts";
import { AlertsPanel } from "@/components/app/AlertsPanel";
import { FooterITM } from "@/components/app/FooterITM";
import { UploadOpenAQ } from "@/components/app/UploadOpenAQ";
import { UploadTempo } from "@/components/app/UploadTempo";

type TempoRecord = { timestamp: string; lat: number; lon: number; no2_tempo?: number; o3_tempo?: number; aod?: number };

type SourcePreview = {
  sensor: any[];
  openaq: any[];
  tempo: TempoRecord[];
};

export default function Index() {
  const [city, setCity] = useState("Bogotá");
  const [coords, setCoords] = useState<{ lat: string; lon: string }>({ lat: "4.711", lon: "-74.0721" });
  const [preview, setPreview] = useState<SourcePreview>({ sensor: [], openaq: [], tempo: [] });
  const [data, setData] = useState<UnifiedRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [radiusKm, setRadiusKm] = useState<string>("50");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchOpenAQ = async () => {
    try {
      const res = await fetch(`/api/openaq?city=${encodeURIComponent(city)}&lat=${coords.lat}&lon=${coords.lon}`);
      if (!res.ok) throw new Error(await res.text());
      const js = await res.json();
      setPreview((p) => ({ ...p, openaq: js }));
    } catch (err) {
      console.error("OpenAQ fetch error", err);
      setPreview((p) => ({ ...p, openaq: [] }));
    }
  };
  const fetchTempo = async () => {
    try {
      const res = await fetch(`/api/tempo?sample=1&lat=${coords.lat}&lon=${coords.lon}`);
      if (!res.ok) throw new Error(await res.text());
      const js = await res.json();
      setPreview((p) => ({ ...p, tempo: js }));
    } catch (err) {
      console.error("TEMPO fetch error", err);
      setPreview((p) => ({ ...p, tempo: [] }));
    }
  };

  const fetchOpenAQStore = async () => {
    try {
      const res = await fetch(`/api/openaq_store`);
      if (!res.ok) throw new Error(await res.text());
      const js = await res.json();
      setPreview((p) => ({ ...p, openaq: js }));
    } catch (err) {
      console.error("OpenAQ store error", err);
    }
  };
  const fetchTempoStore = async () => {
    try {
      const res = await fetch(`/api/tempo_store`);
      if (!res.ok) throw new Error(await res.text());
      const js = await res.json();
      setPreview((p) => ({ ...p, tempo: js }));
    } catch (err) {
      console.error("TEMPO store error", err);
    }
  };

  const mergeAll = async () => {
    setError(null);
    try {
      const res = await fetch(`/api/merge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, lat: Number(coords.lat), lon: Number(coords.lon), radiusKm: Number(radiusKm) || 50 }),
      });
      if (!res.ok) throw new Error(await res.text());
      const js = await res.json();
      setData(js);
    } catch (e: any) {
      setError(e.message || String(e));
    }
  };

  const exportCSV = () => {
    window.location.href = "/api/export_csv";
  };

  const applyChanges = async () => {
    setSaving(true);
    try {
      await Promise.all([fetchOpenAQStore(), fetchTempoStore()]);
      await mergeAll();
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // initial data pulls
    fetchOpenAQ().catch(() => {});
    fetchTempo().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-zinc-900/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-extrabold">ITM</div>
            <div>
              <div className="font-bold text-xl">🌍 AirFusion TEMPO</div>
              <div className="text-xs text-muted-foreground">Instituto Tecnológico Metropolitano (ITM)</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Controls */}
        <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Ciudad</label>
              <input value={city} onChange={(e)=>setCity(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md border bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Lat</label>
              <input value={coords.lat} onChange={(e)=>setCoords(p=>({...p, lat: e.target.value}))} className="w-full mt-1 px-3 py-2 rounded-md border bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Lon</label>
              <input value={coords.lon} onChange={(e)=>setCoords(p=>({...p, lon: e.target.value}))} className="w-full mt-1 px-3 py-2 rounded-md border bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Radio (km)</label>
              <input value={radiusKm} onChange={(e)=>setRadiusKm(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md border bg-background" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={fetchOpenAQ} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">Cargar OpenAQ</button>
              <button onClick={fetchTempo} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90">Cargar datos TEMPO</button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={mergeAll} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Fusionar fuentes</button>
            <button onClick={exportCSV} className="px-4 py-2 rounded-md bg-muted text-foreground">Descargar unificado (CSV)</button>
            <a href="/api/export_openaq" className="px-4 py-2 rounded-md bg-muted text-foreground">Descargar OpenAQ (CSV)</a>
            <a href="/api/export_tempo" className="px-4 py-2 rounded-md bg-muted text-foreground">Descargar TEMPO (CSV)</a>
            <a href="/api/data" target="_blank" className="px-4 py-2 rounded-md bg-muted text-foreground">/api/data</a>
            <div className="text-sm text-muted-foreground ml-auto">Para conectar Power BI, usa http://localhost:8000/api/data</div>
          </div>
        </div>

        {/* KPIs */}
        <KPICards data={data} />

        {/* Map */}
        <MapView data={data} />

        {/* Charts */}
        <Charts data={data} />

        {/* Alerts */}
        <AlertsPanel data={data} />

        {/* Upload */}
        <UploadSensor onUploaded={() => { setDirty(true); }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadOpenAQ onUploaded={() => { fetchOpenAQStore(); setDirty(true); }} />
          <UploadTempo onUploaded={() => { fetchTempoStore(); setDirty(true); }} />
        </div>

        {dirty && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <span className="text-sm">Cambios pendientes. Pulsa guardar para actualizar gráficas.</span>
            <button onClick={applyChanges} className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground disabled:opacity-60" disabled={saving}>{saving ? "Guardando..." : "Guardar y actualizar gráficas"}</button>
            <button onClick={()=>setDirty(false)} className="px-3 py-1.5 rounded-md bg-muted">Descartar</button>
          </div>
        )}

        {/* Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-4 overflow-auto">
            <div className="font-semibold mb-2">Vista previa: OpenAQ</div>
            {preview.openaq.length ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    {Object.keys(preview.openaq[0]).slice(0,6).map((k) => (
                      <th key={k} className="px-2 py-1 text-left font-medium">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.openaq.slice(0,5).map((r:any, i:number) => (
                    <tr key={i} className="border-t">
                      {Object.values(r).slice(0,6).map((v:any, j:number) => (
                        <td key={j} className="px-2 py-1 whitespace-nowrap">{String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="text-sm text-muted-foreground">Sin datos</div>}
          </div>

          <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-4 overflow-auto">
            <div className="font-semibold mb-2">Vista previa: TEMPO</div>
            {preview.tempo.length ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    {Object.keys(preview.tempo[0] ?? {timestamp:1, lat:1, lon:1}).map((k) => (
                      <th key={k} className="px-2 py-1 text-left font-medium">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.tempo.slice(0,5).map((r:any, i:number) => (
                    <tr key={i} className="border-t">
                      {Object.values(r).map((v:any, j:number) => (
                        <td key={j} className="px-2 py-1 whitespace-nowrap">{String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="text-sm text-muted-foreground">Sin datos</div>}
          </div>

          <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-4 overflow-auto">
            <div className="font-semibold mb-2">Vista previa: Sensor</div>
            <div className="text-sm text-muted-foreground">Sube un CSV para ver vista previa.</div>
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

      </main>

      <FooterITM />
    </div>
  );
}
