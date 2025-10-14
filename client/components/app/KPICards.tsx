import React from "react";
import { cn } from "@/lib/utils";

export type UnifiedRecord = {
  timestamp: string;
  lat: number | null;
  lon: number | null;
  pm25_sensor: number | null;
  pm25_openaq: number | null;
  no2_tempo: number | null;
  o3_tempo: number | null;
  temp_c: number | null;
  rh_pct: number | null;
  aqi: number | null;
  alert_flag: boolean;
};

function avg(nums: (number | null | undefined)[]) {
  const arr = nums.filter((n): n is number => typeof n === "number" && !isNaN(n));
  if (!arr.length) return null;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function max(nums: (number | null | undefined)[]) {
  const arr = nums.filter((n): n is number => typeof n === "number" && !isNaN(n));
  if (!arr.length) return null;
  return Math.max(...arr);
}

function aqiLabel(aqi: number | null) {
  if (aqi == null) return "N/D";
  if (aqi <= 50) return "Buena";
  if (aqi <= 100) return "Moderada";
  if (aqi <= 150) return "Insalubre para sensibles";
  if (aqi <= 200) return "Insalubre";
  if (aqi <= 300) return "Muy insalubre";
  return "Peligrosa";
}

export const KPICards: React.FC<{ data: UnifiedRecord[] }>= ({ data }) => {
  const avgPm25 = avg(data.map(d => d.pm25_sensor ?? d.pm25_openaq ?? null));
  const maxPm25 = max(data.map(d => d.pm25_sensor ?? d.pm25_openaq ?? null));
  const alerts = data.filter(d => d.alert_flag).length;
  const avgAqi = avg(data.map(d => d.aqi));

  const items = [
    { title: "PM2.5 promedio", value: avgPm25?.toFixed(1) ?? "N/D", unit: "µg/m³" },
    { title: "PM2.5 máximo", value: maxPm25?.toFixed(1) ?? "N/D", unit: "µg/m³" },
    { title: "N.º alertas", value: String(alerts), unit: "" },
    { title: "AQI promedio", value: avgAqi?.toFixed(0) ?? "N/D", unit: `(${aqiLabel(avgAqi)})` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <div
          key={i}
          className={cn(
            "rounded-xl bg-white/70 dark:bg-zinc-900 border border-border p-4 shadow-sm transition transform hover:-translate-y-0.5 hover:shadow-lg",
          )}
        >
          <div className="text-sm text-muted-foreground">{it.title}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-primary">{it.value}</div>
            <div className="text-sm text-muted-foreground">{it.unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
