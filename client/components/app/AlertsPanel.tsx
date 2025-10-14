import React, { useEffect, useMemo, useState } from "react";
import type { UnifiedRecord } from "./KPICards";

function labelForAQI(aqi: number | null) {
  if (aqi == null) return "N/D";
  if (aqi <= 50) return "Buena";
  if (aqi <= 100) return "Moderada";
  if (aqi <= 150) return "Insalubre p/ sensibles";
  if (aqi <= 200) return "Insalubre";
  if (aqi <= 300) return "Muy insalubre";
  return "Peligrosa";
}

export const AlertsPanel: React.FC<{ data: UnifiedRecord[] }>= ({ data }) => {
  const alerts = useMemo(() => data.filter(d => d.alert_flag), [data]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(alerts.length > 0);
  }, [alerts.length]);

  return (
    <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Panel de alertas</div>
        <div className="text-sm text-muted-foreground">Estado: {labelForAQI(data[data.length-1]?.aqi ?? null)}</div>
      </div>
      <div className="mt-3 max-h-64 overflow-auto">
        {alerts.length === 0 ? (
          <div className="text-sm text-muted-foreground">Sin alertas.</div>
        ) : (
          <ul className="space-y-2">
            {alerts.slice(-10).map((a, i) => (
              <li key={i} className="p-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div className="text-sm font-medium">⚠️ Alerta AQI {a.aqi}</div>
                <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()} · PM2.5: {a.pm25_sensor ?? a.pm25_openaq ?? 'N/D'} µg/m³</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-md w-full border border-border shadow-xl" onClick={(e)=>e.stopPropagation()}>
            <div className="text-xl font-semibold mb-2">⚠️ Alerta</div>
            <p className="text-sm">Alerta: Mala calidad del aire en su zona (AQI ≥ 101).</p>
            <div className="mt-4 text-right">
              <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground" onClick={() => setShowModal(false)}>Entendido</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
